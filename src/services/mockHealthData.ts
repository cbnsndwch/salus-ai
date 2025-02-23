// Mock time series data for health metrics
export const getMockTimeSeriesData = (days: number = 7) => {
  const data = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.unshift({
      date: date.toISOString().split("T")[0],
      heartRate: 65 + Math.floor(Math.random() * 20),
      bloodPressureSystolic: 115 + Math.floor(Math.random() * 15),
      bloodPressureDiastolic: 75 + Math.floor(Math.random() * 10),
      spo2: 96 + Math.floor(Math.random() * 3),
      weight: 69 + Math.floor(Math.random() * 2),
      sleepScore: 75 + Math.floor(Math.random() * 20),
      sleepDuration: 6 + Math.floor(Math.random() * 3),
      snoreCount: 10 + Math.floor(Math.random() * 8),
      heartRateVariability: 40 + Math.floor(Math.random() * 15),
      glucose: 90 + Math.floor(Math.random() * 15),
      bodyTemperature: 97.5 + Math.random(),
      painLevel: Math.floor(Math.random() * 5),
    });
  }

  return data;
};

export const fetchHealthMetrics = async (days: number = 7) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return getMockTimeSeriesData(days);
};
