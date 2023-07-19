export const getRandomColor = () => {
  const letters = "0123456789ABCDEF"; // Chuỗi ký tự để tạo màu ngẫu nhiên
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; // Chọn một ký tự ngẫu nhiên từ chuỗi letters
  }
  return color;
};
export const getPagination = (currentPage, data) => {
  const PAGE_SIZE = Number(process.env.REACT_APP_PAGE_SIZE);
  let startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = data?.slice(startIndex, endIndex);
  return { currentData, PAGE_SIZE, startIndex };
};
