export const url_fetch = "https://asm-2-book-hotel.vercel.app";
export const Fetchdata = async (value, path, tokennn) => {
  try {
    const a = await fetch(`${url_fetch}/${path}`, {
      method: "POST",
      body: JSON.stringify(value),
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokennn,
      },
    });
    if (a.status != 200) {
      throw new Error("Loi ket noi");
    }
    const b = await a.json();
    return b;
  } catch (error) {
    console.log(error);
  }
};
export const Fetchdataget = async (path, tokennn) => {
  try {
    const a = await fetch(`${url_fetch}/${path}`, {
      credentials: "include", // tao cookie phia client
      withCredentials: true, // gui cookie len server
      headers: {
        Authorization: "Bearer " + tokennn,
      },
    });
    if (a.status != 200) {
      throw new Error("Loi ket noi");
    }
    const b = await a.json();
    return b;
  } catch (error) {
    console.log(error);
  }
};
