'use client'
import { useState } from 'react';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Modal } from "@/components/ui/modal";
import React from "react";
import Button from '@/components/ui/button/Button';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';

// export const metadata = {
//   title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
//   // other metadata
// };

export default function BasicTables() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <PageBreadcrumb pageTitle="Basic Table" />
      <div className="space-y-6">
        <Button onClick={() => setIsOpen(true)}>Add User</Button>
        <ComponentCard title="Basic Table 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <form className="">
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>First Name</Label>
              <Input type="text" placeholder="Emirhan" />
            </div>

            <div className="col-span-1">
              <Label>Last Name</Label>
              <Input type="text" placeholder="Boruch" />
            </div>

            <div className="col-span-1">
              <Label>Last Name</Label>
              <Input type="email" placeholder="emirhanboruch55@gmail.com" />
            </div>

            <div className="col-span-1">
              <Label>Phone</Label>
              <Input type="text" placeholder="+09 363 398 46" />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Label>Bio</Label>
              <Input type="text" placeholder="Team Manager" />
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button size="sm" onClick={() => {}}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
