import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import adminService, { type MonthlyStat } from "../../../core/services/adminService";

const StatusChart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      stacked: false,
      height: "100%",
      width: "100%",
      toolbar: {
        show: false,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      zoom: {
        enabled: false
      },
      pan: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Doctors",
        data: [],
      },
      {
        name: "Patients",
        data: [],
      },
    ],
    xaxis: {
      categories: [],
    },
    colors: ["#1b5a90", "#ff9d00"],
    stroke: {
      width: 2,
      curve: "smooth",
    },
    markers: {
      size: 4,
    },
    grid: {
      show: true,
      borderColor: "#ebebeb",
      strokeDashArray: 2,
    },
    tooltip: {
      theme: "light",
    },
    title: {
      text: "Doctors vs Patients Growth",
      align: "left",
    },
    legend: {
      position: "top",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await adminService.getMonthlyStats();
        if (response.success) {
          const monthlyData: MonthlyStat[] = response.data;
          
          const months = monthlyData.map(item => item.month);
          const doctorData = monthlyData.map(item => ({ x: item.month, y: item.doctors }));
          const patientData = monthlyData.map(item => ({ x: item.month, y: item.patients }));
          
          setChartOptions(prev => ({
            ...prev,
            series: [
              {
                name: "Doctors",
                data: doctorData,
              },
              {
                name: "Patients", 
                data: patientData,
              },
            ],
            xaxis: {
              categories: months,
            },
          }));
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        // Fallback to static data if API fails
        setChartOptions(prev => ({
          ...prev,
          series: [
            {
              name: "Doctors",
              data: [
                { x: "Jan", y: 15 },
                { x: "Feb", y: 18 },
                { x: "Mar", y: 20 },
                { x: "Apr", y: 19 },
                { x: "May", y: 21 },
                { x: "Jun", y: 21 },
              ],
            },
            {
              name: "Patients",
              data: [
                { x: "Jan", y: 5 },
                { x: "Feb", y: 6 },
                { x: "Mar", y: 7 },
                { x: "Apr", y: 8 },
                { x: "May", y: 9 },
                { x: "Jun", y: 9 },
              ],
            },
          ],
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          },
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // @ts-ignore
      if (window.ApexCharts && window.ApexCharts.mL) {
        // @ts-ignore
        window.ApexCharts.mL.updateOptions({
          chart: {
            width: "100%",
          },
        });
        // Safely check for ApexCharts and mL before calling methods
        if (
          typeof window !== "undefined" &&
          (window as any).ApexCharts &&
          (window as any).ApexCharts.mL
        ) {
          (window as any).ApexCharts.mL.updateSeries(chartOptions.series);
          (window as any).ApexCharts.mL.render();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chartOptions]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div>Loading chart data...</div>
      </div>
    );
  }

  return (
    <div>
      <ReactApexChart
        options={chartOptions as ApexCharts.ApexOptions}
        series={chartOptions.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default StatusChart;
