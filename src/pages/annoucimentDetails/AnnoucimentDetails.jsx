import React, { useEffect, useState } from "react";
import "./AnnoucimentDetails.css"
import { getAnnouncementId } from "../services/api";
import { useParams } from "react-router-dom";

function AnnoucimentDetails() {
  const { id } = useParams();
  const [annoucimentId, setAnnoucimentId] = useState(null);
  useEffect(() => {
    getAnnouncementId(id)?.then(setAnnoucimentId);
  }, [id]);

  return (
    <>
      <div className="annouciment-Id">
        <div className="container">
          <div
            className="boxelement"
            dangerouslySetInnerHTML={{
              __html: annoucimentId?.description || "",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default AnnoucimentDetails;
