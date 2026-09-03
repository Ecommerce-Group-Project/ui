import { useEffect, useState } from "react";
import type { ProfileData } from "../types/profile.types";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { userApi } from "../api/userApi";

export const UserProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoadig] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadig(true);

    const fetchUserData = async() => {
      try {
        const profileData = await userApi.getProfile();
        setProfileData(profileData);
      } catch (error: any) {
        window.alert(getErrorMessage(error));
      }finally{
        setIsLoadig(false);
      }
    };

    fetchUserData();
  },[]);


  return <>
  
  {isLoading ? (<div>Loading..</div>): (<div>{profileData?.name}</div>)}
  </>
};
