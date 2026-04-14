"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { UserAuthDTO, MyUserDTO} from "@/types/user";
import { useApi } from "@/hooks/useApi";




const Profile: React.FC = () => {
  const apiService = useApi();
  const router = useRouter();
  const { value: token } = useLocalStorage<string | null>("token", null);
  const userId = useParams().id


  useEffect(() => {
    if (token == null) return
    if (!token) {
      router.push("/login")
    }
    const fetchUser = async () => {
      try {
        console.log(Number(userId),token)
        const user = await apiService.get<MyUserDTO>(
          `/users/${Number(userId)}`,
          {
            headers: {
              token: token
            }
          }
        );
        console.log(user) // FROM HERE ON USER contains all information

      } catch (error) {
        console.log(error)

      }
    }
    if(userId){
      fetchUser()
    }
  }, [token,userId, router]);

  return (
    <div className="card-container">
      <div className="card card--wide">
        <h2>User Profile</h2>
        {/* Display user information here */}
      </div>
      <div className="card card--wide">
        <h2></h2>
        {/* Container Card for Stats, Friends etc. */}
      </div>
    </div>
  );
};

export default Profile;
