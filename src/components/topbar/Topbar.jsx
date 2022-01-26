import React from 'react';
import "./topbar.css"
import { NotificationsNone ,Language,Settings} from '@mui/icons-material';
function Topbar() {
  return (
  <div className='topbar'>
  <div className='topbarWrapper'>
      <div className='top-left'>
          <span className='logo'> Zain Modestwears</span>
      </div>
      <div className='top-right'>
      <div className='topbarIconsContainer'>
          <NotificationsNone/>
          <span className='topIconBadge'>2</span>
      </div>
      <div className='topbarIconsContainer'>
          <Language/>
          <span className='topIconBadge'>2</span>
      </div>
      <div className='topbarIconsContainer'>
          <Settings/>
      </div>
      <img src="https://images.pexels.com/photos/9942898/pexels-photo-9942898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="image" className='topAvatar' />
      </div>
  </div>
</div>
  
  );
}

export default Topbar;
