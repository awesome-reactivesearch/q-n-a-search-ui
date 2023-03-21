import ReactDOM from "react-dom/client";

import {
  ReactiveBase,
  SearchBox,
  ReactiveList,
} from "@appbaseio/reactivesearch";

import "./index.css";
import Card from "./components/Card";

const SEARCHBOX_COMPONENT_ID = "search";

const Main = () => {
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
          />
        </div>
      </div>
    </ReactiveBase>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
