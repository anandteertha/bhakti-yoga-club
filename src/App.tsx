import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AboutPage } from "@/pages/AboutPage";
import { CookingClassesPage } from "@/pages/CookingClassesPage";
import { CoursesOfferedPage } from "@/pages/CoursesOfferedPage";
import { HomePage } from "@/pages/HomePage";
import { PastEventsPage } from "@/pages/PastEventsPage";
import { EventDetailPage } from "@/pages/EventDetailPage";
import { EventsPage } from "@/pages/EventsPage";
import { PostPage } from "@/pages/PostPage";
import { VisitingMonksPage } from "@/pages/VisitingMonksPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:slug" element={<EventDetailPage />} />
        <Route path="visiting-monks" element={<VisitingMonksPage />} />
        <Route path="courses-offered" element={<CoursesOfferedPage />} />
        <Route path="cooking-classes" element={<CookingClassesPage />} />
        <Route path="past-events" element={<PastEventsPage />} />
        <Route path="posts/:slug" element={<PostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
