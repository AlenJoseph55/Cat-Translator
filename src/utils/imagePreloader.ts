export const catImages = {
  happy: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&h=400",
  curious: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&h=400",
  sassy: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=400&h=400",
  sleepy: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=400&h=400",
  excited: "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=400&h=400"
};

export const preloadImages = () => {
  Object.values(catImages).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};