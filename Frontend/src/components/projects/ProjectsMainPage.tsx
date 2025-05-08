"use client";

import { Project, ProjectCreateForm } from "@/data/project";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CreateProjectDialog from "./CreateProjectDialog";
import Moment from "../Moment";

const ProjectsMainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<ProjectCreateForm>({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Kullanıcı bir şey yazınca hatayı temizleyelim
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Form Validasyon Kontrolü
  const validateForm = () => {
    const tempErrors = { name: "", description: "" };
    let isValid = true;

    if (!form.name) {
      tempErrors.name = "Project Name zorunludur.";
      isValid = false;
    } else if (form.name.length < 3) {
      tempErrors.name = "Project Name en az 3 karakter olmalıdır.";
      isValid = false;
    }

    if (!form.description) {
      tempErrors.description = "Description zorunludur.";
      isValid = false;
    } else if (form.description.length < 10) {
      tempErrors.description = "Description en az 10 karakter olmalıdır.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const onSubmit = async (formData: { name: string; description: string }) => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("api/jobs/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      const data = await res.json();
      setProjects([...projects, data]);
      setOpenDialog(false);
      setForm({ name: "", description: "" }); // Formu sıfırla
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch("api/jobs/projects");
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return loading ? (
    <LinearProgress />
  ) : (
    <>
      <div className="flex justify-start mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpenDialog(true)}
        >
          Create Project
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-1 border-gray-200 shadow-lg rounded-lg p-4 transition duration-200 ease-in-out hover:bg-gray-100"
          >
            <div className="flex flex-col space-y-2">
              <h6 className="text-lg font-bold">{project.name}</h6>
              <p className="text-sm text-gray-600">
                <strong>Oluşturulma Tarihi: </strong>{" "}
                <Moment date={project.createdAt} />
              </p>
              <p className="text-sm text-gray-600">
                <strong>Proje Kodu: </strong> {project.projectCode}
              </p>
              <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
                <button className="bg-blue-500/15 hover:bg-blue-500/25  text-black px-6 py-2 text-sm mt-2 rounded-md ">
                  <Link href={`/projects/${project.id}`}>
                    Show
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={onSubmit}
        form={form}
        errors={errors}
        onChange={onChange}
        loading={loading}
      />
    </>
  );
};

export default ProjectsMainPage;
