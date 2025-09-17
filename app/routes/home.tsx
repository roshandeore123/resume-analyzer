import { resumes } from "~/Constants";
import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import ResumeCard from "~/Components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "resumind" },
    { name: "description", content: "smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth } =usePuterStore();
  const navigate=useNavigate();
  
  useEffect(()=>{
    if (!auth.isAuthenticated) navigate('/auth?next=/');

  },[auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar/>
          <section className="main-section ">
        <div className="page-heading py-16">
          <h1>Track your applications & resume rating </h1>
          <h2>Review your submission and check AI-powered feedback.</h2>
        </div>
      
       
       {resumes.length > 0  &&(
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume}/>
      ))}
        </div>


       )}
       </section>
     
  </main>;
}
