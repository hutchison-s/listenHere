import { useState, useContext, useEffect } from "react";
import PinCard from "../components/PinCard";
import "./MySounds.css";
import { UserContext } from "../contexts/UserContext";
import PropTypes from "prop-types";

function MySounds() {
  const { profile } = useContext(UserContext);
  const [isFeatured, setIsFeatured] = useState("");
  const [filter, setFilter] = useState("Dropped");

  useEffect(()=>{
    console.log('pins:', profile.pins)
  }, [profile])

  const menuBtnStyle = {
    flex: 1,
    border: "none",
    background: "transparent",
    color: "var(--softwhite)",
    padding: "0.5rem",
  };
  const selectedStyle = {
    flex: 1,
    border: "2px solid transparent",
    background: "var(--darker-75)",
    borderBottom: "2px solid var(--poolside)",
    color: "var(--softwhite)",
    padding: "0.5rem",
  };

  const filteredPins =
    filter === "Dropped"
      ? profile.pins
      : filter === "Liked"
      ? profile.liked
      : profile.viewed;

  const MenuBtn = ({ title }) => {
    return (
      <button
        className="filterMenuOpt"
        style={filter == title ? selectedStyle : menuBtnStyle}
        onClick={() => {
          setFilter(title);
        }}
      >
        {title}
      </button>
    );
  };
  MenuBtn.propTypes = {
    title: PropTypes.string,
  };

  const userPins = ()=>profile.pins.map(pinId => <PinCard key={pinId} pinId={pinId} isFeatured={isFeatured} setIsFeatured={setIsFeatured}/>)

  return (
    <>
      <article className="alignCenter">
        <h2>Sounds for {profile.displayName}</h2>
        <div
          className="pinFilterMenu"
          style={{ display: "flex", width: "100%" }}
        >
          <MenuBtn title="Dropped" />
          <MenuBtn title="Liked" />
          <MenuBtn title="Viewed" />
        </div>
        {/*  */}
        <div
          className="verticalScrollContainer"
          style={{
            display: "grid",
            width: "100%",
            gap: "0.5rem",
            overflow: "auto",
            textAlign: "center",
          }}
        >
          {/* <h3>{profile[filterKeys[filter].key].length} Pin{profile[filterKeys[filter].key].length !== 1 && "s"}</h3> */}
          {/* {filteredPins.length > 0
            ? filteredPins.map((pinId) => (
                <PinCard
                  key={pinId}
                  pinId={pinId}
                  isFeatured={isFeatured}
                  setIsFeatured={setIsFeatured}
                />
              ))
            : null} */}
            {userPins()}
        </div>
      </article>
    </>
  );
}

export default MySounds;
