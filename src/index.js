import ReactDOM from "react-dom/client";

import {
  ReactiveBase,
  SearchBox,
  ReactiveList,
} from "@appbaseio/reactivesearch";

import "./index.css";
import Card from "./components/Card";

const Main = () => (
  <ReactiveBase
    app="movies-demo-app"
    url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
    reactivesearchAPIConfig={{
      recordAnalytics: true,
      userId: "jon",
    }}
    enableAppbase
    // endpoint={{
    //   url: "https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io/movies-ai/_reactivesearch",
    //   method: "POST",
    // }}
  >
    <div className="row">
      <div className="col">
        <SearchBox
          dataField={["original_title", "original_title.search"]}
          componentId="search"
          highlight
          URLParams
          searchboxId="q_and_a_search_ui"
          showClear
        />
        <br />
        <ReactiveList
          componentId="SearchResult"
          dataField="original_title"
          size={10}
          className="result-list-container"
          pagination
          react={{
            and: "search",
          }}
          render={({ data }) => (
            <ReactiveList.ResultCardsWrapper>
              {data.map((item) => (
                <Card {...item} />
              ))}
            </ReactiveList.ResultCardsWrapper>
          )}
        />
      </div>
    </div>
  </ReactiveBase>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
