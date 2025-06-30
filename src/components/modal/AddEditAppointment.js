"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

const AddEditAppointment = ({
  openModal,
  setOpenModal,
  patients,
  categories,
  editData,
  setEditData,
  refetchAppointments,
}) => {
  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    notes: "",
    patient: "",
    category: "",
  });

  useEffect(() => {
    if (editData) {
      const formatDateTimeLocal = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d)) return "";
        const pad = (n) => (n < 10 ? "0" + n : n);
        return (
          d.getFullYear() +
          "-" +
          pad(d.getMonth() + 1) +
          "-" +
          pad(d.getDate()) +
          "T" +
          pad(d.getHours()) +
          ":" +
          pad(d.getMinutes())
        );
      };

      setForm({
        id: editData.id,
        title: editData.title || "",
        start: formatDateTimeLocal(editData.start),
        end: formatDateTimeLocal(editData.end),
        location: editData.location || "",
        notes: editData.notes || "",
        patient: editData.patient || "",
        category: editData.category || "",
      });
    }
  }, [editData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patient || !form.category) {
      alert("Bitte fülle alle Pflichtfelder aus.");
      return;
    }

    try {
      if (form?.id) {
        // UPDATE
        await axios.put(`/api/appointments/${form.id}`, form);
        await refetchAppointments();
        alert("Termin aktualisiert!");
      } else {
        // CREATE
        await axios.post("/api/appointments", form);
        await refetchAppointments();
        alert("Termin erstellt!");
      }

      setForm({
        title: "",
        start: "",
        end: "",
        location: "",
        notes: "",
        patient: "",
        category: "",
      });
      setOpenModal(false);
      setEditData(null);
    } catch (err) {
      console.error(err);
      alert("Fehler: " + err?.response?.data?.error || "Unbekannter Fehler");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      setForm({
        title: "",
        start: "",
        end: "",
        location: "",
        notes: "",
        patient: "",
        category: "",
      });
      setOpenModal(false);
      setEditData(null);
      await refetchAppointments();
      alert("Termin gelöscht!");
    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.data?.error || error.message
      );
      alert(
        "Löschen nicht möglich: " +
          (error.response?.data?.error || "Unbekannter Fehler")
      );
    }
  };

  const handleCloseModal = () => {
    setForm({
      title: "",
      start: "",
      end: "",
      location: "",
      notes: "",
      patient: "",
      category: "",
    });
    setOpenModal(false);
    setEditData(null);
  };

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white border-none outline-none">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Termin bearbeiten" : "Neuen Termin erstellen"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Titel*"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
          <div className="flex items-end gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="start">Start</Label>
              <Input
                id="start"
                type="datetime-local"
                value={form.start}
                onChange={(e) => handleChange("start", e.target.value)}
                required
              />
            </div>

            <p>Bis</p>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="end">Ende</Label>
              <Input
                id="end"
                type="datetime-local"
                value={form.end}
                onChange={(e) => handleChange("end", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Klient:in</Label>
            <Select
              value={form.patient}
              onValueChange={(v) => handleChange("patient", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Klient:in auswählen" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.firstname} {p.lastname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Kategorie</Label>
            <Select
              value={form.category}
              onValueChange={(v) => handleChange("category", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Kategorie wählen" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Ort*"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
          />
          <Textarea
            placeholder="Notizen"
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          <DialogFooter>
            {editData ? (
              <Button
                onClick={() => handleDelete(editData.id)}
                className="bg-red-600 text-white"
                type="button"
              >
                Löschen
              </Button>
            ) : (
              ""
            )}

            <Button className="bg-black text-white" type="submit">
              {editData ? "Aktualisieren" : "Speichern"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditAppointment;
