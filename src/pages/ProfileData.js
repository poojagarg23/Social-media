import React from 'react'
import { Tabs } from "antd";
import PhotosUser from './PhotosUser';
import LikesPost from './LikesPost';

const ProfileDataInformation = (props) => {

    const userProfile = props;
    console.log(userProfile, "propsfromImage")
    const { TabPane } = Tabs;
    return (
        <div className='tabs-Profile'>
            <Tabs  >

                <TabPane tab="Scrolls" key="1">
                    <div className='tab-desc' >Scrolls</div>
                </TabPane>
                <TabPane tab="videos" key="2">
                    <div className='tab-desc'  >videos</div>
                </TabPane>
                <TabPane tab="Photos" key="3">
                    <div className='tab-desc'  >
                        <PhotosUser userProfile={userProfile} />
                    </div>
                </TabPane>
                <TabPane tab="Likes" key="4">
                    <div className='tab-desc' >
                        <LikesPost userProfile={userProfile} />
                    </div>
                </TabPane>
                <TabPane tab="share" key="5">
                    <div className='tab-desc' >share</div>
                </TabPane>

            </Tabs>

        </div>
    )
}

export default ProfileDataInformation
