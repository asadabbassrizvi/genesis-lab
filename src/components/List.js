import React, { useState } from "react";

function List({ List }) {
  const ul = {
    height: "0px",
    opacity: "0",
  };

  const [active, setActive] = useState(null);
  const handleItemClick = (i) => {
    setActive(i === active ? null : i);
  };
  return (
    <div>
      {List.map((item, i) => (
        <ul key={i}>
          <li style={{ listStyle: "none" }}>
            <button
              style={{ border: "none", background: "transparent" }}
              onClick={() => handleItemClick(i)}
            >
              {active !== i ? "+" : "-"}
            </button>{" "}
            {item.name}
            <ul style={active === i ? {} : ul}>
              <li>Domain : {item.domains[0]}</li>
              <li>Country Code : {item.alpha_two_code}</li>
              <li>
                <a href={item.web_pages[0]} target="_blank">
                  {" "}
                  Web Sites : {item.web_pages[0]}
                </a>
              </li>
              <li>State / Province : {item["state-province"]}</li>
            </ul>
            {/* you can also do something like below
        {active === i && <ul><li><li/></ul>}
         to hide show list but I prefered to do with css */}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default List;
