import { Divider, Grid } from "@mui/material";
import React from "react";
import img1 from "@/assets/home/img1.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Activity = () => {
  return (
    <div>
      <h2 className="text-red-600 text-xl font-medium uppercase mb-3">
        Hoạt động phong trào
      </h2>
      <Divider className="bg-blue-800 mb-2" />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div>
            <div className="mb-3 h-72">
              <LazyLoadImage src={img1.src} className="object-contain h-full" />
            </div>
            <h3 className="text-lg font-semibold mb-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Delectus, sint?
            </h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
              eius, ab sed neque explicabo blanditiis tenetur itaque ad
              perferendis iste. Possimus eaque reiciendis corrupti quis nostrum
              rem iste laborum cum?
            </p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <div className="mb-3 h-72">
              <LazyLoadImage src={img1.src} />
            </div>
            <h3 className="text-lg font-semibold mb-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Delectus, sint?
            </h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
              eius, ab sed neque explicabo blanditiis tenetur itaque ad
              perferendis iste. Possimus eaque reiciendis corrupti quis nostrum
              rem iste laborum cum?
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Activity;
