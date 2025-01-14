import React, { useEffect } from "react";

function AdBanner({ adSlot }) {
  useEffect(() => {
    // Google AdSense 스크립트 초기화
    if (window.adsbygoogle && process.env.NODE_ENV === "production") {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8915599765552936"
        data-ad-slot="6579394402"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdBanner;
