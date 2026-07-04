"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { isAdmin, loginWithPassword, logout } from "@/lib/adminAuth";

async function guard() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

export async function loginAction(formData: FormData) {
  await loginWithPassword(
    String(formData.get("username") ?? ""),
    String(formData.get("password") ?? ""),
  );
  revalidatePath("/admin");
}

export async function logoutAction() {
  await logout();
  revalidatePath("/admin");
}

/* ── Listings ── */
export async function upsertListing(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  const data = {
    slug: String(formData.get("slug")).trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
    title: String(formData.get("title")).slice(0, 140),
    titleGu: String(formData.get("titleGu") ?? "").slice(0, 140) || null,
    type: String(formData.get("type")),
    status: String(formData.get("status")),
    price: Number(formData.get("price")) || 0,
    areaSqft: Number(formData.get("areaSqft")) || null,
    bedrooms: Number(formData.get("bedrooms")) || null,
    locality: String(formData.get("locality")).slice(0, 80),
    description: String(formData.get("description")).slice(0, 2000),
    descriptionGu: String(formData.get("descriptionGu") ?? "").slice(0, 2000) || null,
    featured: formData.get("featured") === "on",
    isSample: formData.get("isSample") === "on",
  };
  if (id) await db.listing.update({ where: { id }, data });
  else await db.listing.create({ data });
  revalidatePath("/admin/listings");
  revalidatePath("/", "layout");
}

export async function deleteListing(formData: FormData) {
  await guard();
  await db.listing.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/listings");
  revalidatePath("/", "layout");
}

/* ── Inquiries ── */
export async function toggleInquiry(formData: FormData) {
  await guard();
  const id = String(formData.get("id"));
  const current = await db.inquiry.findUnique({ where: { id } });
  if (current) await db.inquiry.update({ where: { id }, data: { handled: !current.handled } });
  revalidatePath("/admin/inquiries");
}

/* ── Testimonials ── */
export async function setTestimonialApproval(formData: FormData) {
  await guard();
  const id = String(formData.get("id"));
  const approve = formData.get("approve") === "1";
  if (approve) await db.testimonial.update({ where: { id }, data: { approved: true } });
  else await db.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
}

export async function addTestimonial(formData: FormData) {
  await guard();
  await db.testimonial.create({
    data: {
      name: String(formData.get("name")).slice(0, 80),
      locality: String(formData.get("locality") ?? "").slice(0, 80) || null,
      service: String(formData.get("service")),
      message: String(formData.get("message")).slice(0, 600),
      approved: true,
    },
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
}

/* ── Seva & Civic status updates ── */
export async function updateSevaStatus(formData: FormData) {
  await guard();
  await db.sevaRequest.update({
    where: { id: String(formData.get("id")) },
    data: {
      status: String(formData.get("status")),
      note: String(formData.get("note") ?? "").slice(0, 300) || null,
    },
  });
  revalidatePath("/admin/seva");
}

export async function updateCivicStatus(formData: FormData) {
  await guard();
  await db.civicIssue.update({
    where: { id: String(formData.get("id")) },
    data: {
      status: String(formData.get("status")),
      note: String(formData.get("note") ?? "").slice(0, 300) || null,
      public: formData.get("public") === "on",
    },
  });
  revalidatePath("/admin/civic");
  revalidatePath("/", "layout");
}
