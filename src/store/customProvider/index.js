"use client";

import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "..";
import { useEffect } from "react";
import { Get } from "@/interceptor/axiosInterceptor";
import { setBlogs } from "../blog/blogSlice";
import { setCmsData } from "../common/commonSlice";
import Script from "next/script";

export function CustomProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <ApisProvider>{children}</ApisProvider>
      </PersistGate>
    </Provider>
  );
}

function ApisProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,ht",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    const fetchData = async () => {
      try {
        const cms = await Get({
          route: "cms/public/page/footerPage",
        });

        if (cms?.response) {
          dispatch(setCmsData(cms.response?.data));
        }

        const blogs = await Get({
          route: "blog",
        });

        if (blogs?.response) {
          dispatch(
            setBlogs(
              blogs.response?.data?.data || blogs.response?.data || []
            )
          );
        }
      } catch (error) {
        console.error("API Fetch Error:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return <>{children}</>;
}