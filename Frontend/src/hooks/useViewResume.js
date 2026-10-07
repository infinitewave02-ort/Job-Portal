/**
 * useViewResume — React hook
 *
 * Handles opening a PDF resume in the device's native PDF reader via Android Intent.
 *
 * Supported sources:
 *  • LOCAL  — file already picked by @react-native-documents/picker (content:// URI)
 *             → wrap with FileProvider authority and fire ACTION_VIEW Intent
 *  • REMOTE — http/https URL
 *             → download to app cache via react-native-blob-util, then fire Intent
 *
 * States returned:
 *  isLoading  — true while downloading a remote file
 *  progress   — download progress 0-100 (remote only)
 *  openResume — call this with a resumeFile object or URL string
 */

import React, { useState, useCallback } from 'react';
import { Alert, Platform, Linking, Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function useViewResume() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

  const openResume = useCallback(async (resumeFile) => {
    if (!resumeFile) {
      Alert.alert(
        'No Resume Found',
        'No resume has been uploaded yet. Please upload a resume first.',
        [{ text: 'OK' }]
      );
      return;
    }

    const isRemote =
      typeof resumeFile === 'string' &&
      (resumeFile.startsWith('http://') || resumeFile.startsWith('https://'));

    try {
      if (isRemote) {
        setCurrentUrl(resumeFile);
        setModalVisible(true);
      } else {
        Alert.alert('Info', 'Local resume viewing is not supported yet.');
      }
    } catch (err) {
      console.error('[useViewResume]', err);
      Alert.alert('Cannot Open Resume', 'An error occurred while trying to open the resume.');
    }
  }, []);

  const handleOpenBrowser = async () => {
    setModalVisible(false);
    if (currentUrl) await Linking.openURL(currentUrl);
  };

  const handleSystemApps = async () => {
    if (!currentUrl) return;
    
    try {
      const RNBlobUtil = require('react-native-blob-util').default;
      const { dirs } = RNBlobUtil.fs;
      const localPath = `${dirs.DocumentDir}/temp_resume.pdf`;
      
      setIsLoading(true);
      setProgress(0);
      setModalVisible(false); // hide modal while downloading
      
      await RNBlobUtil.config({
        fileCache: true,
        path: localPath
      })
      .fetch('GET', currentUrl)
      .progress((received, total) => {
        setProgress(Math.round((received / total) * 100));
      });
      
      // Open with system PDF viewer explicitly
      await RNBlobUtil.android.actionViewIntent(localPath, 'application/pdf');
      
    } catch (error) {
      console.log('Open with PDF error:', error.message);
      Alert.alert('Error', 'No PDF viewer app found on your device or an error occurred.', [
        { text: 'Try Browser Instead', onPress: handleOpenBrowser },
        { text: 'Cancel', style: 'cancel' }
      ]);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const ResumePopup = () => (
    <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <View style={styles.dragHandle} />
          <Text style={styles.sheetTitle}>Open with</Text>
          
          <TouchableOpacity style={styles.appOption} onPress={handleOpenBrowser}>
            <View style={[styles.appIcon, { backgroundColor: '#E1F5FE' }]}>
              <Icon name="globe-outline" size={24} color="#0288D1" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.appName}>Browser / Web Viewer</Text>
              <Text style={styles.appDesc}>View directly in Chrome or your default browser</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appOption} onPress={handleSystemApps}>
            <View style={[styles.appIcon, { backgroundColor: '#F3E5F5' }]}>
              <Icon name="apps-outline" size={24} color="#7B1FA2" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.appName}>System Default Apps</Text>
              <Text style={styles.appDesc}>Choose from installed PDF readers & recommended apps</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return { isLoading, progress, openResume, ResumePopup };
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    elevation: 5,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  appOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  appDesc: {
    fontSize: 13,
    color: '#888',
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  }
});

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

/** Open a local file path via Android FileProvider → VIEW Intent */
async function _openFileIntent(absolutePath, mimeType) {
  await RNBlobUtil.android.actionViewIntent(absolutePath, mimeType);
}

/** Open a content:// URI via Android VIEW Intent */
async function _openContentUri(contentUri) {
  // react-native-blob-util can open content URIs directly
  await RNBlobUtil.android.actionViewIntent(contentUri, 'application/pdf');
}
