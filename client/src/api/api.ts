import { toast } from "../Components/ui/Toast/use-toast";

const host = process.env.NODE_ENV === "production" ? "" : "//localhost:3000/";

interface RequestOptions {
  method: string;
  headers: {
    "Access-Control-Allow-Origin": string;
    "content-type"?: string;
    Authorization?: string;
  };
  body?: string | FormData;
}

const request = async (
  method: string,
  url: string,
  data?: any,
  type?: string
): Promise<any> => {
  const options: RequestOptions = {
    method,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (type === "formData") {
    const formData = new FormData();
    // Append each key-value pair to FormData
    for (const key in data) {
      // If the key is "file" and the value is a File object, append it directly with the key "file"
      if (key === "file" && data[key] instanceof File) {
        formData.append("file", data[key]);
      } else {
        // Otherwise, append as usual
        formData.append(key, data[key]);
      }
    }
    options.body = formData;
  } else {
    options.headers["content-type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (localStorage["Authorization"]) {
    options.headers["Authorization"] = JSON.parse(
      localStorage.Authorization
    ).token;
  }

  try {
    const res = await fetch(host + url, options);
    const responseData = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        toast({
          title: "Session expired, please log in again.",
          variant: "destructive",
        });
      } else {
        if (Array.isArray(responseData.message)) {
          toast({
            title: responseData.message.toString(),
            variant: "destructive",
          });
          throw new Error(responseData.message.toString());
        }
        toast({ title: responseData.message, variant: "destructive" });
        throw new Error(responseData.message);
      }
    }

    return responseData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const patch = request.bind(null, "PATCH");
const del = request.bind(null, "DELETE");

export { get, post, put, patch, del };
