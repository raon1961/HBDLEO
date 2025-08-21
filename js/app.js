const members = [
  { id: 1, name: "HAPPY", profileImg: "images/leo1-profile.jpg", detailImg: "images/leo1-detail.jpg", bio: "리오야 포기하지 않아줘서 고마워." },
  { id: 2, name: "BIRTHDAY", profileImg: "images/leo2-profile.jpg", detailImg: "images/leo2-detail.jpg", bio: "늘 너 자신을 믿고 달리자. 그럼 무엇이든 할 수 있을거야." },
  { id: 3, name: "LEE LEO", profileImg: "images/leo3-profile.jpg", detailImg: "images/leo3-detail.jpg", bio: "행복한 생일이 되길." },
  { id: 4, name: "LEO FANS", profileImg: "images/leo4-profile.jpg", detailImg: "images/leo4-detail.jpg", bio: "리오 맛있는거 많이 먹어." },
  { id: 5, name: "WANT", profileImg: "images/leo5-profile.jpg", detailImg: "images/leo5-detail.jpg", bio: "데뷔하겠습니다!!" },
  { id: 6, name: "LEO'S DEBUT", profileImg: "images/leo6-profile.jpg", detailImg: "images/leo6-detail.jpg", bio: "리오 사랑해!" },
  { id: 7, name: "리오야 생일 축하해!", profileImg: "images/leo7-profile.jpg", detailImg: "images/leo7-detail.jpg", bio: "리오 사랑해!" },
  { id: 8, name: "리오 꼭 데뷔하자!", profileImg: "images/leo8-profile.jpg", detailImg: "images/leo8-detail.jpg", bio: "리오 사랑해!" },
  { id: 9, name: "리오 잘 하고 있어!", profileImg: "images/leo9-profile.jpg", detailImg: "images/leo9-detail.jpg", bio: "리오야 나도 리오 꼭 데뷔하면 좋겠어" }
];

// 스크롤 등장 훅
function useScrollAnimation() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if(ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, visible];
}

// 멤버 카드 (프로필 이미지만 표시)
function MemberCard({ member, onClick }) {
  const [ref, visible] = useScrollAnimation();
  return React.createElement(
    "div",
    {
      ref: ref,
      className: `bg-white rounded-lg shadow-md p-4 sm:p-6 text-center cursor-pointer transform transition duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`,
      onClick: () => onClick(member)
    },
    React.createElement("img", { src: member.profileImg, alt: member.name, className: "w-40 h-60 mx-auto rounded-lg object-cover" }),
    React.createElement("h2", {
      className: "text-lg sm:text-xl font-semibold mt-2",
      style: { fontFamily: "Sequel100Black, sans-serif" }
    }, member.name)
  );
}

// SNS 아이콘 섹션
function SocialSection() {
  const [ref, visible] = useScrollAnimation();

  return React.createElement(
    "div",
    { ref: ref, className: `mt-12 flex justify-center space-x-6 opacity-0 transform translate-y-10 transition duration-700 ${visible ? "opacity-100 translate-y-0" : ""}` },
    React.createElement("a", { href: "https://www.youtube.com/ALPHAONE", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/youtube.png", alt: "YouTube", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://www.instagram.com/ALPHAONE", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/instagram.png", alt: "Instagram", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://x.com/ALPHAONE", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/x.png", alt: "X", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    )
  );
}

// 메인 앱 (모달에는 detailImg 사용)
function App() {
  const [selectedMember, setSelectedMember] = React.useState(null);
  const handleCloseModal = () => setSelectedMember(null);

  return React.createElement(
    "div",
    { className: "container mx-auto p-4" },
    React.createElement(
      "div",
      { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" },
      members.map(member => React.createElement(MemberCard, { key: member.id, member: member, onClick: setSelectedMember }))
    ),
    React.createElement(SocialSection),
    selectedMember &&
    React.createElement("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      onClick: handleCloseModal
    },
      React.createElement("div", {
        className: "bg-white p-6 rounded-lg w-11/12 max-w-md relative",
        onClick: e => e.stopPropagation()
      },
        React.createElement("button", { className: "absolute top-2 right-2 text-gray-500", onClick: handleCloseModal }, "X"),
        React.createElement("img", { src: selectedMember.detailImg, alt: selectedMember.name, className: "w-56 h-44 mx-auto rounded-lg object-cover" }),
        React.createElement("h2", {
          className: "text-2xl sm:text-3xl font-bold mt-4 text-center",
          style: { fontFamily: "Sequel100Black, sans-serif" }
        }, selectedMember.name),
        React.createElement("p", { className: "mt-2 text-gray-600 text-center text-sm sm:text-base" }, selectedMember.bio)
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
