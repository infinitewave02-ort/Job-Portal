import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../../styles/Employer/EmployerProfileView';
import { useEmployer } from '../../context/EmployerContext';

const EmployerProfileView = ({ navigation, route }) => {
  const { employerProfile, updateEmployerProfile } = useEmployer();
  const routeParams = route?.params || {};

  // Fetch profile from backend every time screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const { getMe } = require('../../services/authService');
          const res = await getMe();
          const resUser = res?.data?.data || res?.data?.user || res?.data;
          if (resUser && typeof resUser === 'object' && typeof updateEmployerProfile === 'function') {
            updateEmployerProfile(resUser);
          }
        } catch (e) {
          console.warn('Failed to fetch employer profile:', e.message);
        }
      };
      fetchProfile();
    }, [updateEmployerProfile])
  );

  const companyName = employerProfile?.companyName || routeParams.companyName || 'Company Name';
  const industryType = employerProfile?.industryType || routeParams.industryType || 'Not specified';
  const contactPerson = employerProfile?.contactPerson || routeParams.contactPerson || 'Not specified';
  const companyEmail = employerProfile?.companyEmail || routeParams.companyEmail || 'Not specified';
  const contactNumber = employerProfile?.contactNumber || routeParams.contactNumber || 'Not specified';
  const address = employerProfile?.address || routeParams.address || 'Not specified';
  const website = employerProfile?.website || routeParams.website || 'Not specified';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Company Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.logoContainer}>
          <Text style={styles.companyName}>{companyName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Industry</Text>
          <Text style={styles.value}>{industryType}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contact Person</Text>
          <Text style={styles.value}>{contactPerson}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{companyEmail}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contact Number</Text>
          <Text style={styles.value}>{contactNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Website</Text>
          <Text style={styles.value}>{website}</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('EditEmployerProfile')}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#FF3B30', marginTop: 15 }]}
          onPress={async () => {
            const { logoutUser } = require('../../services/authService');
            await logoutUser();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Root' }],
            });
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate({ name: 'EmployerDashboard', params: { companyName, contactPerson, industryType, companyEmail, contactNumber, address }, merge: true })}>
          <Ionicons name="home-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SearchCandidates')}>
          <Ionicons name="search-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployerMessages')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#485ff4" />
          <Text style={[styles.navLabel, { color: '#485ff4' }]}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default EmployerProfileView;
