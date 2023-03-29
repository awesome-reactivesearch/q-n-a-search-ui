import ReactDOM from "react-dom/client";

import {
  ReactiveBase,
  SearchBox,
  ReactiveList,
  AIAnswer,
} from "@appbaseio/reactivesearch";

import "./index.css";
import Card from "./components/Card";
import { useState } from "react";

const SEARCHBOX_COMPONENT_ID = "search";
const Main = () => {
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  return (
    <ReactiveBase
      app="movies-demo-app"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
      reactivesearchAPIConfig={{
        recordAnalytics: false,
        userId: "jon",
      }}
      theme={{
        typography: {
          fontFamily: "monospace",
          fontSize: "16px",
        },
      }}
      enableAppbase
    >
      <div className="row">
        <div className="col">
          <SearchBox
            dataField={["original_title", "original_title.search"]}
            componentId={SEARCHBOX_COMPONENT_ID}
            URLParams
            searchboxId="q_and_a_search_ui"
            showClear
            debounce={500}
            highlight={false}
            defaultValue="Movies released in the year 2021"
          />
          {!isResultsLoading && (
            <AIAnswer
              componentId="ai-answer"
              placeholder="Ask a question"
              showVoiceInput
              showIcon
              react={{ and: [SEARCHBOX_COMPONENT_ID] }}
              enableAI
              AIConfig={{
                docTemplate:
                  "${source.text} is ${source.summary} with url as ${source.url}",
                queryTemplate: "Answer the following: ${value}",
                topDocsForContext: 7,
              }}
              title={<b>AI Chatbox</b>}
              enterButton={true}
            />
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
