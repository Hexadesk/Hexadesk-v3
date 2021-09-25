import React from "react";
import MemberCard from "./MemberCard";

export const Members = ({ members }) => {
  return (
    <section className="members-container pb-3">
      <div className="row mx-0 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 ">
        {members.map((value) => (
          <MemberCard className="my-3 mx-1" member={value} />
        ))}
      </div>
    </section>
  );
};
