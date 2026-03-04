import React, { useState } from "react";
import "./StoryWorld.css";

/* ---------------- STORY IMAGES ---------------- */
import lion from "../assets/stories/lion.jpg";
import tortoise from "../assets/stories/tortoise.jpg";
import wolf from "../assets/stories/wolf.jpg";
import cinderella from "../assets/stories/cinderella.jpg";
import snowwhite from "../assets/stories/snowwhite.jpg";
import duckling from "../assets/stories/duckling.jpg";
import jack from "../assets/stories/jack.jpg";
import bears from "../assets/stories/bears.jpg";
import pigs from "../assets/stories/pigs.jpg";
import red from "../assets/stories/red.jpg";

/* ---------------- RHYME IMAGES ---------------- */
import twinkle from "../assets/rhymes/twinkle.jpg";
import baa from "../assets/rhymes/baa.jpg";
import bus from "../assets/rhymes/bus.jpg";
import farm from "../assets/rhymes/farm.jpg";
import humpty from "../assets/rhymes/humpty.jpg";
import johny from "../assets/rhymes/johny.jpg";
import abc from "../assets/rhymes/abc.jpg";
import jackRhyme from "../assets/rhymes/jack.jpg";
import rain from "../assets/rhymes/rain.jpg";
import bridge from "../assets/rhymes/bridge.jpg";

const StoryWorld = () => {
  const [activeTab, setActiveTab] = useState("stories");
  const [selectedItem, setSelectedItem] = useState(null);

  /* -------- Convert YouTube link to EMBED -------- */
  const getEmbedLink = (url) => {
    if (!url) return "";
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  /* ---------------- STORIES ---------------- */
  const stories = [
    {
      id: 1,
      title: "The Lion and the Mouse",
      image: lion,
      content: "A mighty lion once caught a tiny mouse. The mouse later saved the lion from a hunter’s net.",
      videoLink: "https://youtu.be/GxcGVCEEdcU"
    },
    {
      id: 2,
      title: "The Tortoise and the Hare",
      image: tortoise,
      content: "A fast hare laughed at a slow tortoise. But slow and steady won the race.",
      videoLink: "https://youtu.be/Fm9VUjihKJ4"
    },
    {
      id: 3,
      title: "The Boy Who Cried Wolf",
      image: wolf,
      content: "A shepherd boy lied about a wolf. When a real wolf came, no one believed him.",
      videoLink: "https://youtu.be/dlflr5b5VgQ"
    },
    {
      id: 4,
      title: "Cinderella",
      image: cinderella,
      content: "With the help of her fairy godmother, Cinderella met the prince and found happiness.",
      videoLink: "https://youtu.be/DgwZebuIiXc"
    },
    {
      id: 5,
      title: "Snow White",
      image: snowwhite,
      content: "Snow White escaped her jealous queen and was saved by a prince.",
      videoLink: "https://youtu.be/iigRJzpACuc"
    },
    {
      id: 6,
      title: "The Ugly Duckling",
      image: duckling,
      content: "A duckling teased for being different grew into a beautiful swan.",
      videoLink: "https://youtu.be/OSWLxj4kTKA"
    },
    {
      id: 7,
      title: "Jack and the Beanstalk",
      image: jack,
      content: "Jack climbed a magical beanstalk and found a giant’s treasure.",
      videoLink: "https://youtu.be/-qxtmahpBwM"
    },
    {
      id: 8,
      title: "Goldilocks and the Three Bears",
      image: bears,
      content: "Goldilocks entered the bears' house and learned to respect others.",
      videoLink: "https://youtu.be/VjIE-Sl-qKY"
    },
    {
      id: 9,
      title: "The Three Little Pigs",
      image: pigs,
      content: "Three pigs built houses. Only the brick house survived the wolf.",
      videoLink: "https://youtu.be/PhJs-5ZJHKA"
    },
    {
      id: 10,
      title: "Little Red Riding Hood",
      image: red,
      content: "Little Red Riding Hood met a wolf but was saved by a woodcutter.",
      videoLink: "https://youtu.be/yDPwz9NsDbQ"
    }
  ];

  /* ---------------- RHYMES ---------------- */
  const rhymes = [
    {
      id: 1,
      title: "Twinkle Twinkle Little Star",
      image: twinkle,
      content: "Twinkle, twinkle, little star...",
      videoLink: "https://youtu.be/hqzvHfy-Ij0"
    },
    {
      id: 2,
      title: "Baa Baa Black Sheep",
      image: baa,
      content: "Baa, baa, black sheep...",
      videoLink: "https://youtu.be/MR5XSOdjKMA"
    },
    {
      id: 3,
      title: "Wheels on the Bus",
      image: bus,
      content: "The wheels on the bus go round and round...",
      videoLink: "https://youtu.be/e_04ZrNroTo"
    },
    {
      id: 4,
      title: "Old MacDonald Had a Farm",
      image: farm,
      content: "Old MacDonald had a farm...",
      videoLink: "https://youtu.be/Wm4R8d0d8kU"
    },
    {
      id: 5,
      title: "Humpty Dumpty",
      image: humpty,
      content: "Humpty Dumpty sat on a wall...",
      videoLink: "https://youtu.be/nrv495corBc"
    },
    {
      id: 6,
      title: "Johny Johny Yes Papa",
      image: johny,
      content: "Johny Johny? Yes Papa?...",
      videoLink: "https://youtu.be/EA_fbT6oN2k"
    },
    {
      id: 7,
      title: "ABC Song",
      image: abc,
      content: "A B C D E F G...",
      videoLink: "https://youtu.be/RIQDmnIJZv8"
    },
    {
      id: 8,
      title: "Jack and Jill",
      image: jackRhyme,
      content: "Jack and Jill went up the hill...",
      videoLink: "https://youtu.be/FYojUSFfuMg"
    },
    {
      id: 9,
      title: "Rain Rain Go Away",
      image: rain,
      content: "Rain, rain, go away...",
      videoLink: "https://youtu.be/NBuA6YIQHCs"
    },
    {
      id: 10,
      title: "London Bridge Is Falling Down",
      image: bridge,
      content: "London Bridge is falling down...",
      videoLink: "https://youtu.be/wwosJXWGWRY"
    }
  ];

  const dataToShow = activeTab === "stories" ? stories : rhymes;

  return (
    <div className="story-world">
      <h2 className="heading">📚 Story World</h2>

      <div className="tabs">
        <button
          className={activeTab === "stories" ? "active" : ""}
          onClick={() => setActiveTab("stories")}
        >
          Stories
        </button>

        <button
          className={activeTab === "rhymes" ? "active" : ""}
          onClick={() => setActiveTab("rhymes")}
        >
          Rhymes
        </button>
      </div>

      <div className="card-container">

        {selectedItem && (
          <div className="story-popup">
            <div className="popup-content">
              <h2>{selectedItem.title}</h2>

              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="popup-img"
              />

              <p>{selectedItem.content}</p>

              {selectedItem.videoLink && (
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="315"
                    src={getEmbedLink(selectedItem.videoLink)}
                    title="YouTube video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <button onClick={() => setSelectedItem(null)}>
                Close
              </button>
            </div>
          </div>
        )}

        {dataToShow.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <button
              className="read-btn"
              onClick={() => setSelectedItem(item)}
            >
          lets go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryWorld;