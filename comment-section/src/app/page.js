import AddComment from "./components/AddComment";
import CommentSection from "./components/CommentSection";

export default function Home() {
  return (
    <div className="min-h-full font-[family-name:var(--font-geist-sans)]">
      <main className="w-full">
        <div className="flex flex-col items-center p-4 bg-slate-100">
          <CommentSection />
          <AddComment/>
        </div>
      </main>

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className="text-sm align-middle text-blue-500">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">AravindhNC</a>
        </div>
      </footer> */}
    </div>
  );
}
