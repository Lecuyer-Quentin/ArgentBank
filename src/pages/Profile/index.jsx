import React from 'react';
import ProfileBanner from '../../features/profile/ProfileBanner';
import AccountDetails from '../../components/AccountDetails'
import { AccountDataProvider } from '../../app/data/DataContext';


/**
 * Renders the user's profile page with a banner and account details.
 * @returns {JSX.Element} The profile page JSX element.
 */
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
        