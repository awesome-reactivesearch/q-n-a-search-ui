import ReactDOM from "react-dom/client";

import {
  ReactiveBase,
  SearchBox,
  ReactiveList,
} from "@appbaseio/reactivesearch";

import "./index.css";
import Card from "./components/Card";
import TypingEffect from "./components/TypingEffect";
import { useEffect, useState } from "react";
import { formatText } from "./utils/helper";
const SEARCHBOX_COMPONENT_ID = "search";
const Main = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  useEffect(() => {
    if (aiResponse && isResultsLoading) {
      setAiResponse("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResultsLoading]);

  return (
    <ReactiveBase
      app="movies-demo-app"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
      theme={{
        typography: {
          fontFamily: "monospace",
          fontSize: "16px",
        },
      }}
      enableAppbase
      endpoint={{
        url: "https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io/movies-ai/_reactivesearch",
        method: "POST",
      }}
      transformResponse={async (elasticsearchResponse, componentId) => {
        console.log({ componentId, elasticsearchResponse });
        if (componentId === SEARCHBOX_COMPONENT_ID) {
          setAiResponse(
            elasticsearchResponse.chatGPTResponse.choices[0].message.content
          );
        }
        return elasticsearchResponse;
      }}
    >
      <div className="row">
        <div className="col">
          <SearchBox
            dataField={["original_title", "original_title.search"]}
            componentId={SEARCHBOX_COMPONENT_ID}
            highlight
            URLParams
            searchboxId="q_and_a_search_ui"
            showClear
            debounce={500}
          />
          {!isResultsLoading && aiResponse && (
            <div className="ai-response-wrapper">
              <TypingEffect
                message={formatText(aiResponse)}
                speed={10}
                eraseSpeed={20}
                avatar={"https://www.svgrepo.com/show/361202/hubot.svg"}
              />
            </div>
          )}
          <br />
          <ReactiveList
            componentId="SearchResult"
            dataField="original_title"
            size={10}
            showResultStats={false}
            renderNoResults={function () {
              return (
                <span style={{ color: "#fff" }}>
                  Oops! try searching something else.
                </span>
              );
            }}
            className="result-list-container"
            react={{
              and: SEARCHBOX_COMPONENT_ID,
            }}
            render={({ data, loading, resultStats }) => {
              if (isResultsLoading !== loading) {
                setIsResultsLoading(loading);
              }
              if (loading) {
                return (
                  <div className="results-loader">
                    <img
                      src="https://i.pinimg.com/originals/bc/56/b3/bc56b31a50e519be2ed335a47e75bc62.gif"
                      alt="results loading"
                    />
                  </div>
                );
              }
              return (
                <div>
                  {" "}
                  <span style={{ color: "#fff" }}>
                    Showing {resultStats.displayedResults} of total&nbsp;
                    {resultStats.numberOfResults} in {resultStats.time} ms
                  </span>
                  <ReactiveList.ResultCardsWrapper>
                    {data.map((item) => (
                      <Card {...item} key={item._id} />
                    ))}
                  </ReactiveList.ResultCardsWrapper>
                </div>
              );
            }}
            pagination={!isResultsLoading}
          />
        </div>
      </div>
    </ReactiveBase>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
