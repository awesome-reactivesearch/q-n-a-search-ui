import ReactDOM from "react-dom/client";

import {
  ReactiveBase,
  SearchBox,
  ReactiveList,
} from "@appbaseio/reactivesearch";

import "./index.css";
import Card from "./components/Card";
import TypingEffect from "./components/TypingEffect";

const Main = () => (
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
        <div className="ai-response-wrapper">
          <TypingEffect
            message={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in velit id velit ullamcorper ultricies. Ut fringilla, risus sit amet rhoncus bibendum, justo eros laoreet sapien, quis aliquet sapien nisl eu ex. Suspendisse vel lectus ante. Donec eget leo euismod, vehicula turpis sed, feugiat massa. Etiam auctor diam vitae justo sollicitudin, eu ultricies purus posuere. Etiam luctus lobortis nulla, eget mollis nulla varius eu. Nunc pulvinar sapien vel dui imperdiet bibendum. Aenean in lacus semper, volutpat velit eu, consequat elit. Duis malesuada massa justo, a lacinia arcu malesuada in. Nullam quis mauris sed odio pellentesque efficitur. Quisque molestie magna eu pharetra maximus. Mauris eu convallis odio. Nam scelerisque orci non efficitur hendrerit. Sed nec leo blandit, pretium risus in, vulputate eros."
            }
            speed={10}
            eraseSpeed={20}
            avatar={"https://www.svgrepo.com/show/361202/hubot.svg"}
          />
        </div>
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
                <Card {...item} key={item._id} />
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
