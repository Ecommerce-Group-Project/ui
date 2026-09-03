import { axiosClient } from "@/shared/api/axiosClient";
import type { ProfileData } from "../types/profile.types";

export const userApi = {
    getProfile: async () : Promise<ProfileData>=>{
        const {data} = await axiosClient.get<ProfileData>('api/user/profile');
        return data;

    }
}