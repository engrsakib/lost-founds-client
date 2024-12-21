import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Fade } from "react-awesome-reveal";

const Mission = () => {
  const { dark } = useContext(AuthContext); // Use the theme context

  const missions = [
    {
      id: 1,
      icon: "📦", // Icon for Found Items
      title: "Found Items",
      description:
        "Browse items reported found to reconnect them with their rightful owners.",
    },
    {
      id: 2,
      icon: "🔍", // Icon for Lost Items
      title: "Lost Items",
      description:
        "Report your lost belongings and let the community help locate them.",
    },
    {
      id: 3,
      icon: "📃", // Icon for Guidelines
      title: "Guidelines",
      description:
        "Learn how to report and claim lost or found items securely.",
    },
    {
      id: 4,
      icon: "🤝", // Icon for Community Support
      title: "Community Support",
      description:
        "Engage with others to assist in returning lost items to owners.",
    },
  ];

  return (
    <>
      <div className={`py-16 }`}>
        <Fade delay={1e3} cascade damping={1e-1}>
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-orange-500">
              OUR MISSION
            </h2>

            <p
              className={`mt-4 text-lg ${
                dark ? "text-gray-300" : "text-gray-700"
              } max-w-2xl mx-auto`}
            >
              Empowering individuals and communities by fostering innovation,
              creating opportunities, and making a meaningful impact on the
              world.
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-6 lg:px-20">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="group relative bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 border border-gray-200 dark:border-gray-600"
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg group-hover:bg-orange-600 transition-colors duration-300">
                {mission.icon}
              </div>
              <div className="p-6 pt-14">
                <h3 className="text-xl font-bold text-center text-orange-500 dark:text-orange-400">
                  {mission.title}
                </h3>
                <p
                  className={`mt-4 text-center ${
                    dark ? "text-gray-300" : "text-gray-300"
                  }`}
                >
                  {mission.description}
                </p>
                <div className="mt-6 text-center">
                  <button className="btn btn-sm btn-outline btn-primary group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mission;
