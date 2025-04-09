export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const svgBackground = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 1422 800" width="1422" height="800"><g transform="scale(1) rotate(0) translate(0 0) skewX(0) skewY(0)" transform-origin="711 400"><rect width="2844" height="1600" x="-711" y="-400" fill="url(#rrreplicate-pattern1)"></rect><rect width="2844" height="1600" x="-711" y="-400" fill="url(#rrreplicate-pattern2)"></rect></g><defs><pattern id="rrreplicate-pattern1" width="260" height="260" patternUnits="userSpaceOnUse" patternTransform="rotate(90)" stroke-width="4" fill="none" stroke="#000000" stroke-opacity="0.1">
        <line x1="26" y1="0" x2="26" y2="260"></line><line x1="78" y1="0" x2="78" y2="260"></line><line x1="130" y1="0" x2="130" y2="260"></line><line x1="182" y1="0" x2="182" y2="260"></line><line x1="234" y1="0" x2="234" y2="260"></line>
        </pattern><pattern id="rrreplicate-pattern2" width="260" height="260" patternUnits="userSpaceOnUse" patternTransform="rotate(180)" stroke-opacity="0.1" stroke-width="2.2" fill="none" stroke="#000000">
        <line x1="32.5" y1="0" x2="32.5" y2="260"></line><line x1="97.5" y1="0" x2="97.5" y2="260"></line><line x1="162.5" y1="0" x2="162.5" y2="260"></line><line x1="227.5" y1="0" x2="227.5" y2="260"></line>
        </pattern></defs></svg>
      `;

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            svgBackground
          )}")`,
          backgroundSize: "cover",
          color: "#333",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
