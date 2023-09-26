import React from 'react';
import ProfileBanner from '../../features/profile/ProfileBanner';
import AccountDetails from '../../components/AccountDetails'
import { AccountDataProvider } from '../../app/data/DataContext';


const Profile = () => {

    return (
      <section className='profile'>
        <ProfileBanner />

        <AccountDataProvider>
          <AccountDetails />
        </AccountDataProvider>

      </section>
      
    );
};

export default Profile;
        