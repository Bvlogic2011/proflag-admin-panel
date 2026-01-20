"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoxIconLine, GroupIcon, UserIcon } from "@/icons";
import Image from "next/image";
import axios from "axios";
import Icon from "@/components/ui/icon/Icons";
import { MdMoneyOff, MdOndemandVideo } from "react-icons/md";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEnvelopeOpen,
  FaMoneyBillWave,
  FaRegCalendarCheck,
  FaRegCalendarMinus,
} from "react-icons/fa";
import { TbHandStop } from "react-icons/tb";
import BarChart from "@/components/ui/charts/BarChart";

export default function Home() {
  const [counts, setCounts] = useState({
    total_users: 0,
    simple_users: 0,
    business_users: 0,
  });

  const [courseCounts, setCourseCounts] = useState({
    total_courses: 0,
    free_courses: 0,
    paid_courses: 0,
  });

  const [eventCounts, setEventCounts] = useState({
    total_events: 0,
    passed_events: 0,
    open_events: 0,
  });

  const [jobCounts, setJobCounts] = useState({
    total_jobs: 0,
    closed_jobs: 0,
    opened_jobs: 0,
  });

  const [Business_Accounts_List, setBusiness_Accounts_List] = useState([]);

  const [baccountsLoader, setBAccountsLoader] = useState(true);
  const [countsLoader, setCountsLoader] = useState(true);

  const fetchBusinessUsers = async () => {
    setBAccountsLoader(true);
    try {
      const {
        data: { data: businessUsers },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/admin/business_accounts`,
      );
      setBusiness_Accounts_List(businessUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setBAccountsLoader(false);
    }
  };

  const fetchAllCounts = async () => {
    setCountsLoader(true);
    try {
      const [userRes, courseRes, eventRes, jobRes] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/admin/account_stats`,
        ),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/courses/admin/course_stats`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/admin/event_stats`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/admin/job_stats`),
      ]);

      setCounts(userRes.data.data);
      setCourseCounts(courseRes.data.data);
      setEventCounts(eventRes.data.data);
      setJobCounts(jobRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCountsLoader(false);
    }
  };

  useEffect(() => {
    fetchAllCounts();
    fetchBusinessUsers();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-12 xl:col-span-12">
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-4">
          <div className="col-span-12 space-y-6 xl:col-span-6">
            <h4 className="text-xl font-bold text-gray-800 mb-3">Courses</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-4 mb-4">
              <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                  <Icon
                    icon={MdOndemandVideo}
                    className="text-gray-800 text-xl"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Total Courses</span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                    {countsLoader ? "-" : courseCounts.total_courses}
                  </h4>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                  <Icon icon={MdMoneyOff} className="text-gray-800 text-xl" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Free Courses</span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                    {countsLoader ? "-" : courseCounts.free_courses}
                  </h4>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                  <FaMoneyBillWave className="text-gray-800 size-6" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Paid Courses</span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                    {countsLoader ? "-" : courseCounts.paid_courses}
                  </h4>
                </div>
              </div>
            </div>
            {!countsLoader && (
              <div>
                <BarChart
                  title="Course Chart"
                  categories={["Total", "Free", "Paid"]}
                  series={[
                    {
                      name: "Courses",
                      data: [
                        courseCounts.total_courses,
                        courseCounts.free_courses,
                        courseCounts.paid_courses,
                      ],
                    },
                  ]}
                />
              </div>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <h4 className="text-xl font-bold text-gray-800 mb-3">Events</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-4 mb-4">
              <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                  <Icon
                    icon={FaCalendarAlt}
                    className="text-gray-800 text-xl"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Total Events</span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                    {countsLoader ? "-" : eventCounts.total_events}
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                  <Icon
                    icon={FaRegCalendarMinus}
                    className="text-gray-800 text-xl"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Passed Events</span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                    {countsLoader ? "-" : eventCounts.passed_events}
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                  <Icon
                    icon={FaRegCalendarCheck}
                    className="text-gray-800 text-xl"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Open Events</span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                    {countsLoader ? "-" : eventCounts.open_events}
                  </h4>
                </div>
              </div>
            </div>
            {!countsLoader && (
              <div>
                <BarChart
                  title="Events Chart"
                  categories={["Total", "Passed", "Open"]}
                  series={[
                    {
                      name: "Events",
                      data: [
                        eventCounts.total_events,
                        eventCounts.passed_events,
                        courseCounts.open_events,
                      ],
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
        <h4 className="text-xl font-bold text-gray-800 mb-3">Jobs</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-4 mb-4">
          <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <Icon icon={FaBriefcase} className="text-gray-800 text-xl" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Jobs</span>
              <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                {countsLoader ? "-" : jobCounts.total_jobs}
              </h4>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <Icon icon={TbHandStop} className="text-gray-800 text-xl" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Closed Jobs</span>
              <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                {countsLoader ? "-" : jobCounts.closed_jobs}
              </h4>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <FaEnvelopeOpen className="text-gray-800 text-xl" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Open Jobs</span>
              <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                {countsLoader ? "-" : jobCounts.opened_jobs}
              </h4>
            </div>
          </div>
        </div>
        <h4 className="text-xl font-bold text-gray-800 mb-3">Accounts</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-4 mb-4">
          <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <GroupIcon className="text-gray-800 size-6" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Accounts</span>
              <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                {countsLoader ? "-" : counts.total_users}
              </h4>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <BoxIconLine className="text-gray-800 size-6" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Business Accounts</span>
              <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                {countsLoader ? "-" : counts.business_users}
              </h4>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <UserIcon className="text-gray-800 size-6" />
            </div>
            <div>
              <span className="text-sm text-gray-500">User Accounts</span>
              <h4 className="mt-1 font-bold text-gray-800 text-title-sm">
                {countsLoader ? "-" : counts.simple_users}
              </h4>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Name</TableCell>
              <TableCell isHeader>Email</TableCell>
              <TableCell isHeader>Phone</TableCell>
              <TableCell isHeader>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody
            loading={baccountsLoader}
            isEmpty={!Business_Accounts_List.length}
            className="divide-y divide-gray-100"
          >
            {Business_Accounts_List.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={u.profile_image_url || "/icons/dummyuser.png"}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full h-9"
                      objectFit="cover"
                    />
                    <span className="font-medium">
                      {u.first_name} {u.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone || "-"}</TableCell>
                <TableCell>
                  <Badge color={u.is_active ? "success" : "danger"}>
                    {u.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
