import React, { useEffect, useState, useNavigate, useRef } from "react";
import "./Page1.css";
import Select from "../components/SelectComponent";
import Table from "../components/Table";
import BarChart from "../components/BarChart";
import Toggle from "../components/ToggleComponent";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Page1 = (props) => {
  const history = useHistory();
  const location = useLocation();
  //var countries = ["America", "India", "Maldives"];

  //incase if we have to add any new column simply we can add here, no need to do any code changes.
  const headers = ["City", "Population", "Vaccinated", "Doses Available"];
  //color - for chart view
  const masterData = {
    Population: "orange",
    Vaccinated: "blue",
    "Doses Available": "grey",
  };

  const currentState = useSelector((state) => state);

  const [selectedCountry, setSelectedCountry] = useState(
    location.state ? location.state.country : ""
  );

  const [selectedState, setSelectedState] = useState(
    location.state ? location.state.state : ""
  );

  const [stateList, setStateList] = useState(
    location.state ? Object.keys(currentState[selectedCountry]).sort() : []
  );
  const cityList = useRef([]);

  //const [headers, setHeaders] = useState([]);

  /**
   * This function converts the state data (object of object) to arrays which will be fed
   * to the table
   *
   * @param {string} state
   * @return {return} array
   */
  const getCities = (state = "") => {
    //let cState = selectedState === "" ? state : selectedState;
    let data = currentState[selectedCountry][state];
    let arr = [];
    Object.keys(data)
      .sort()
      .forEach((it) => {
        let arr1 = [];
        arr1.push(it);
        for (var k in data[it]) {
          //looping here so that it will be generic.
          arr1.push(data[it][k]);
        }
        arr.push(arr1);
      });
    return arr;
  };

  const [rowData, setRowData] = useState(
    location.state ? getCities(location.state.state) : []
  );
  const [rawRowData, setRawRowData] = useState({});

  const [dummy, setDummy] = useState();

  const dispatch = useDispatch();

  /**
   * This function handles the country selection change
   *
   * @param {string} Pointerevent
   */
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setStateList(Object.keys(currentState[event.target.value]).sort());
    //setSelectedState(data1[event.target.value][0]);
    //console.log("current state", currentState);
    if (selectedState) {
      setSelectedState(null);
    }
  };

  /**
   * This function handles the state selection change
   *
   * @param {string} Pointerevent
   */
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    //setRawRowData();

    setRowData(getCities(event.target.value));
    setDummy(setChartData());
  };

  /**
   * This function navigates to page2
   *
   * @param {props} object
   */
  const goToPage2 = (props) => {
    console.log(props);
    let cities = [];
    Object.keys(currentState[selectedCountry][selectedState])
      .sort()
      .forEach((it) => cities.push(it));
    cityList.current = cities;
    history.push("/update", {
      country: selectedCountry,
      state: selectedState,
      cityList: cityList.current,
      city: props[0],
      props: props,
    });
  };

  const toggleData = [
    { value: "table", text: "Table" },
    { value: "chart", text: "Chart" },
  ];

  const [view, setView] = useState("table");

  const hanldeViewChange = (event, newView) => {
    setView(newView);
  };

  /**
   * This function return the chart data
   *
   * @param {return} object
   */
  const setChartData = () => {
    if (!selectedCountry || !selectedState) {
      return;
    }
    let stats = currentState[selectedCountry][selectedState];
    let cities = Object.keys(stats).sort();
    //looping and not using directly because if we need to add any new entry then we have to only update the masterData
    //and need not touch the code.
    let dataSet = [];
    for (let key in masterData) {
      let obj = {};
      obj.label = key;
      obj.data = [];
      for (let i = 0; i < cities.length; i++) {
        obj.data.push(stats[cities[i]][key]);
      }
      obj.backgroundColor = masterData[key];
      dataSet.push(obj);
    }
    return { labels: cities, data: dataSet };
  };

  const [loaderVisible, setLoaderVisible] = useState(
    location.state ? false : true
  );

  useEffect(() => {
    history.replace("", null);
  }, []);

  //Api call is done to fetch the country and state list and the state is set.
  useEffect(() => {
    //API call mimic'ed here.
    //setLoaderVisible(true);
    // fetch("http://localhost:9089/getList")
    // .then(res => res.json())
    // .then(data => dispatch(setState(data)))
    // .then(() => setLoaderVisible(false))
    // .catch(error => {
    //  showError(error);
    //  setLoaderVisible(false);
    // });
    setTimeout(() => setLoaderVisible(false), 2000);
  }, []);

  return (
    <div>
      {loaderVisible && (
        <div className="page-loader">
          <CircularProgress />
        </div>
      )}
      <div
        className={loaderVisible ? "parent-container-blur" : "parent-container"}
      >
        <Toggle
          data={toggleData}
          selectedValue={view}
          handleChange={hanldeViewChange}
        />
        <div className="select-container-cc">
          <div className="select">
            <Select
              id="Country"
              values={Object.keys(currentState).sort()}
              value={selectedCountry}
              onChange={handleCountryChange}
            />
          </div>

          <div className="select">
            <Select
              id="State"
              values={stateList}
              value={selectedState}
              onChange={handleStateChange}
            />
          </div>
        </div>
        <div className="content-container">
          {rowData.length > 0 && selectedState ? (
            view === "table" ? (
              <Table headers={headers} rows={rowData} onEdit={goToPage2} />
            ) : (
              <BarChart data={setChartData()} />
            )
          ) : (
            <h3>Please select a country and state to view the stats</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page1;
