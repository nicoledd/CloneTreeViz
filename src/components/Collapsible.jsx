import { MagicMotion } from "react-magic-motion";
import React, {useState} from "react";
import Tabs from "./Tabs.jsx";
import ImportFile from "./ImportFile.jsx";

export default function Collapsible() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "2rem",
          }}
        >
          <MagicMotion>
            <aside
              style={{
                width: isCollapsed ? "1rem" : "30rem",
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                paddingLeft: isCollapsed ? "1.5rem" : "5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  justifyItems: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {!isCollapsed && (
                  <h1 style={{ margin: 0, fontFamily: "courier new" }}>
                    Clone Tree Viz
                  </h1>
                )}
                <div
                  style={{
                    display: "flex",
                    paddingLeft: "1rem",
                    alignItems: "auto",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      cursor: "pointer",
                      padding: 0,
                      border: 0,
                      backgroundColor: "white",
                    }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    {isCollapsed ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 12.9999V10.9999H15.4853L12.2427 7.75724L13.6569 6.34303L19.3137 11.9999L13.6569 17.6567L12.2427 16.2425L15.4853 12.9999H1Z"
                          fill="currentColor"
                        />
                        <path
                          d="M20.2877 6V18H22.2877V6H20.2877Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        style={{ minWidth: "24px", minHeight: "24px" }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.2877 11.0001V13.0001H7.80237L11.045 16.2428L9.63079 17.657L3.97394 12.0001L9.63079 6.34326L11.045 7.75748L7.80236 11.0001H22.2877Z"
                          fill="currentColor"
                        />
                        <path d="M3 18V6H1V18H3Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </aside>
          </MagicMotion>
          <MagicMotion>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "50vw",
              }}
            >
              <aside
                style={{
                  backgroundColor: "white",
                  border: "2px solid darkblue",
                  padding: "1rem",
                  margin: "1rem 2rem 2rem",
                  borderRadius: "0.65rem",
                  width: isCollapsed ? "1.3rem" : "50vw",
                  height: "auto",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  overflow: "scroll",
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    display: "flex",
                    width: "35vw",
                    height: "80vh",
                  }}
                >
                  <ImportFile />
                  <Tabs
                    key="exclude"
                    send_from_tab_to_app={get_from_tab_to_app}
                  />
                </div>
              </aside>
            </div>
          </MagicMotion>
        </div>
        </>
    )
}