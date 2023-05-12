import { useEffect, useState } from "react";
import zc from "@dvsl/zoomcharts";

let NetChart = zc.NetChart;

function ZoomCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length) {
      new NetChart({
        container: document.getElementById("chart"),
        area: { height: 700 },
        data: {
          preloaded: {
            focusedNodes: [
              ...data.map((obj) => ({
                id: obj.a.elementId,
                style: {
                  label: obj.a.properties.name,
                },
              })),
            ],
            nodes: [
              ...data.map((obj) => ({
                id: obj.m.elementId,
                style: {
                  label: obj.m.properties.title,
                  fillColor: "rgba(47,195,47,1)",
                },
              })),
              ...data.map((obj) => ({
                id: obj.d.elementId,
                style: { label: obj.d.properties.name },
              })),
            ],
            links: [
              ...data.map((obj) => ({
                id: obj.a.elementId + "-" + obj.m.elementId, 
                from: obj.m.elementId,
                to: obj.a.elementId,
                style: {
                  label: "acted in",
                  toDecoration: "arrow",
                },
              })),
              ...data.map((obj) => ({
                id: obj.m.elementId + "-" + obj.d.elementId,
                from: obj.d.elementId,
                to: obj.m.elementId,
                style: {
                  label: "directed",
                  toDecoration: "arrow",
                },
              })),
            ],
            
            
          },
        },
        interaction: { selection: { lockNodesOnMove: false } },
        navigation: {
          initialNodes: [data[0].a.elementId],
          mode: "focusnodes",
          focusNodeExpansionRadius: 1,
        },
        style: {
          node: { display: "roundtext" },
        },
      });
    }
  }, [data]);


  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/records.json`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return <div id="chart"></div>;
}

export default ZoomCharts;
