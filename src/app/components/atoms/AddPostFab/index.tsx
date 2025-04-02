"use client";
import AddPostModal from "@app/components/organisms/AddPostModal";
import { useState } from "react";
import { Fab } from "react-tiny-fab";
import "./AddPostFab.styles.scss";

const AddPostFab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fab-container">
      <Fab
        icon={"+"}
        alwaysShowTitle={true}
        onClick={() => setIsModalOpen(true)}
      >
        {/* <Action text="Email" onClick={() => {}} />
        <Action text="Help" onClick={() => {}}>
          <i className="fa fa-help" />
        </Action> */}
      </Fab>

      <AddPostModal isOpen={isModalOpen} handleModalClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AddPostFab;
