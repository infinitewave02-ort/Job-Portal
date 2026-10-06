import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Root from './screens/Root';
import EmployeeSplash from './screens/Employee/EmployeeSplash';
import ChooseOption from './screens/Employee/ChooseOption';
import EmployerSplash from './screens/Employer/EmployerSplash';
import CompanyDetails from './screens/Employer/CompanyDetails';
import CompanyProfile from './screens/Employer/CompanyProfile';
import ChoosePlan from './screens/Employer/ChoosePlan';
import PaymentDetails from './screens/Employer/PaymentDetails';
import PaymentSucess from './screens/Employer/PaymentSucess';
import EmployerDashboard from './screens/Employer/Dashboard';
import SearchCandidates from './screens/Employer/SearchCandidates';
import SearchResults from './screens/Employer/SearchResults';
import CandidateProfile from './screens/Employer/CandidateProfile';
import MessageCandidate from './screens/Employer/MessageCandidate';
import CallCandidate from './screens/Employer/CallCandidate';
import ResumePreview from './screens/Employer/ResumePreview';
import EmployerMessages from './screens/Employer/EmployerMessages';
import EmployerProfileView from './screens/Employer/EmployerProfileView';
import CreateJobPost from './screens/Employer/CreateJobPost';
import Register from './screens/Common/Register';
import OtpVerification from './screens/Common/OtpVerfication';
import CreateAccount from './screens/Employee/CreateAccount';
import BasicDetails from './screens/Employee/BasicDetails';
import CompleteProfile from './screens/Employee/CompleteProfile';
import UploadResume from './screens/Employee/UploadResume';
import ProfileCreated from './screens/Employee/ProfileCreated';
import Jobs from './screens/Employee/Jobs';
import Messages from './screens/Employee/Messages';
import Activity from './screens/Employee/Activity';
import Profile from './screens/Employee/Profile';
import ProfileViews from './screens/Employee/ProfileViews';
import ContactRequests from './screens/Employee/ContactRequests';
import EditEmployeeProfile from './screens/Employee/EditProfile';
import EmployeeLogin from './screens/Employee/Login';
import EditEmployerProfile from './screens/Employer/EditProfile';
import EmployerLogin from './screens/Employer/Login';
import AdminLogin from './screens/Admin/Login';
import AdminDashboard from './screens/Admin/Dashboard';
import ManageEmployees from './screens/Admin/ManageEmployees';
import ManageEmployers from './screens/Admin/ManageEmployers';
import ManageJobs from './screens/Admin/ManageJobs';
import ReportsAnalytics from './screens/Admin/ReportsAnalytics';
import OpenToWork from './screens/Admin/OpenToWork';
import TotalResumes from './screens/Admin/TotalResumes';
import { AdminProvider } from './context/AdminContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { EmployerProvider } from './context/EmployerContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AdminProvider>
      <EmployeeProvider>
        <EmployerProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={Root} />
          <Stack.Screen name="EmployeeSplash" component={EmployeeSplash} />
          <Stack.Screen name="EmployerSplash" component={EmployerSplash} />
          <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
          <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
          <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
          <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
          <Stack.Screen name="PaymentSucess" component={PaymentSucess} />
          <Stack.Screen name="EmployerDashboard" component={EmployerDashboard} />
          <Stack.Screen name="SearchCandidates" component={SearchCandidates} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen name="CandidateProfile" component={CandidateProfile} />
          <Stack.Screen name="MessageCandidate" component={MessageCandidate} />
          <Stack.Screen name="CallCandidate" component={CallCandidate} />
          <Stack.Screen name="ResumePreview" component={ResumePreview} />
          <Stack.Screen name="EmployerMessages" component={EmployerMessages} />
          <Stack.Screen name="EmployerProfileView" component={EmployerProfileView} />
          <Stack.Screen name="CreateJobPost" component={CreateJobPost} />
          <Stack.Screen name="ChooseOption" component={ChooseOption} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OTPVerification" component={OtpVerification} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="BasicDetails" component={BasicDetails} />
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
          <Stack.Screen name="UploadResume" component={UploadResume} />
          <Stack.Screen name="ProfileCreated" component={ProfileCreated} />
          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="Activity" component={Activity} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProfileViews" component={ProfileViews} />
          <Stack.Screen name="ContactRequests" component={ContactRequests} />
          <Stack.Screen name="EditEmployeeProfile" component={EditEmployeeProfile} />
          <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
          <Stack.Screen name="EditEmployerProfile" component={EditEmployerProfile} />
          <Stack.Screen name="EmployerLogin" component={EmployerLogin} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="ManageEmployees" component={ManageEmployees} />
          <Stack.Screen name="ManageEmployers" component={ManageEmployers} />
          <Stack.Screen name="ManageJobs" component={ManageJobs} />
          <Stack.Screen name="ReportsAnalytics" component={ReportsAnalytics} />
          <Stack.Screen name="OpenToWork" component={OpenToWork} />
          <Stack.Screen name="TotalResumes" component={TotalResumes} />
        </Stack.Navigator>
      </NavigationContainer>
        </EmployerProvider>
      </EmployeeProvider>
    </AdminProvider>
  );
};

export default App;
