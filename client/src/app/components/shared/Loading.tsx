const Loading = () => {
    return (
      <main className="h-screen flex items-center justify-center">
        <section className="text-center">
          <h1 className="text-black text-lg font-semibold">TaskTrack</h1>
          <span 
            className="loading loading-dots loading-lg text-blue-500"
            role="status" 
            aria-live="polite"
            aria-label="Loading"
          ></span>
        </section>
      </main>
    );
  };
  
  export default Loading;
  