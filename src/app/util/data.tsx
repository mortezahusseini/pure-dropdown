import {
  ArtTrack,
  FoodBank,
  Games,
  LocalHospital,
  School,
  Science,
  SportsFootball,
  SportsHockey,
  SportsSharp,
} from "@mui/icons-material";

export const usDropdownData = () => {
  return [
    {
      id: 1,
      title: "Science",
      icon: <School  fontSize="small" className="ml-2" color="inherit" />,
    },
    {
      id: 2,
      title: "Education",
      icon: <School fontSize="small" className="ml-2" color="inherit" />,
    },
    {
      id: 4,
      title: "Yeeeah, science!",
      icon: <Science  fontSize="small" className="ml-2" color="inherit"  />,
    },
    {
      id: 14,
      title: "Art",
      icon: <ArtTrack  fontSize="small" className="ml-2" color="inherit"  />,
    },
    {
      id: 5,
      title: "Sport",
      icon: <SportsFootball  fontSize="small" className="ml-2" color="inherit"  />,
    },
    {
      id: 6,
      title: "Games",
      icon: <Games  fontSize="small" className="ml-2" color="inherit"  />,
    },
    {
      id: 7,
      title: "Health",
      icon: <LocalHospital  fontSize="small" className="ml-2" color="inherit"  />,
    },
    {
      id: 8,
      title: "Food",
      icon: <FoodBank  fontSize="small" className="ml-2" color="inherit"  />,
    },
    {
      id: 9,
      title: "Ski",
      icon: <SportsHockey  fontSize="small" className="ml-2" color="inherit"  />,
    },
    {
      id: 10,
      title: "Paraglider",
      icon: <SportsSharp  fontSize="small" className="ml-2" color="inherit"  />,
    },
  ];
};
