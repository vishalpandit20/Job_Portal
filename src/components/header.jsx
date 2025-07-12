import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { Button } from './ui/button'
import { SignedIn } from '@clerk/clerk-react'
import { SignIn } from '@clerk/clerk-react'
import { SignedOut } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { Briefcase, BriefcaseBusiness, Heart, PenBox, User } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const header = () => {

  const[showSignIn,setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  useEffect(()=> {
    if(search.get("sign-in")){
      setShowSignIn(true);
    }
  },[search])

  const handleOverlayClick= (e)=> {
    if(e.target === e.currentTarget){
      setShowSignIn(false);
      setSearch({});
    }
  }
return (
    <>
    <nav className='py-4 flex justify-between items-center'>
        <Link>
        <img src="../../public/logo.png" alt="" className='h-20' />
        </Link>

      <div className='flex gap-8'>
      <SignedOut>
        <Button variant="outline" onClick={()=> setShowSignIn(true)}>Login</Button>
      </SignedOut>
      
      <SignedIn>
        {/* add a condition here */}
        <Button variant="destructive" className="rounded-full">
        <PenBox size={20} className="mr-2"/>
            Post a Job
          </Button>
          <Link to="/post-job"></Link>
        <UserButton 
        appearance={{
          elements:{
            avatarBox: "h-10 w-10",
          },
        }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
            label='My Jobs'
            labelIcon={<BriefcaseBusiness size={15}/>}
            href='/my-jobs'
            />
            <UserButton.Link
            label='Saved Jobs'
            labelIcon={<Heart size={15}/>}
            href='/saved-job'
            />
          </UserButton.MenuItems>

          </UserButton>
      </SignedIn> 
      </div>
        
    </nav>

    {showSignIn && ( 
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleOverlayClick}
      >
      <SignIn
      signUpForcedRedirectUrl="/onboarding"
      fallbackRedirectUrl="/onboarding"
      />
        
      </div>
    )
    }
    </>
)
}

export default header