import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Fade } from "react-awesome-reveal";

const Mission = () => {
  const { dark } = useContext(AuthContext); // Use the theme context

  const missions = [
    {
      id: 1,
      icon: "📚", 
      title: "Free Education",
      description:
        "We aim to provide free education to underprivileged children and ensure access to learning materials.",
    },
    {
      id: 2,
      icon: "🍲", 
      title: "Feed Poor Child",
      description:
        "Our mission is to end child hunger by providing nutritious meals to children in need.",
    },
    {
      id: 3,
      icon: "💊", 
      title: "Free Medicines",
      description:
        "Providing essential medicines free of cost to those who cannot afford them.",
    },
    {
      id: 4,
      icon: "🏠", 
      title: "Give Shelter",
      description:
        "Helping the homeless find shelter and a place to call home.",
    },
  ];
  return (
    <>
      <div className="py-16 bg-base-100">
        <Fade delay={1e3} cascade damping={1e-1}>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-orange-500">OUR MISSION</h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our mission is to empower individuals, communities, and
              organizations by providing innovative solutions, fostering growth,
              and making a meaningful impact on the world. We are committed to
              creating opportunities, driving positive change, and building a
              future where everyone can thrive.
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="card bg-base-200 shadow-md p-6 border-t-4 border-orange-500"
            >
              <div className="flex justify-center text-5xl">{mission.icon}</div>
              <h3 className="text-xl font-bold text-orange-500 text-center mt-4">
                {mission.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
                {mission.description}
              </p>
              <div className="text-center mt-4">
                <button className="btn btn-outline btn-primary btn-sm">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mission;
