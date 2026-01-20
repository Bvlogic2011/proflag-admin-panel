"use client"
import React, { useEffect, useState } from 'react'
import Badge from "@/components/ui/badge/Badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from 'axios';
import { BoxIconLine, GroupIcon, UserIcon } from '@/icons';
import Image from 'next/image';

export default function AccountsPage() {

    const [counts, setCounts] = useState({
        total_users: 0,
        simple_users: 0,
        business_users: 0,
    });


    const [Accounts_List, setAccounts_List] = useState([]);

    const [accountsLoader, setAccountsLoader] = useState(true);
    const [countsLoader, setCountsLoader] = useState(true);

    const fetchAccountsList = async () => {
        setAccountsLoader(true);
        try {
            const {
                data: { data: businessUsers },
            } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/users/admin/accounts`,
            );
            setAccounts_List(businessUsers);
        } catch (err) {
            console.error(err);
        } finally {
            setAccountsLoader(false);
        }
    };

    const fetchAllCounts = async () => {
        setCountsLoader(true);
        try {
            const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/admin/account_stats`)

            setCounts(userRes.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setCountsLoader(false);
        }
    };

    useEffect(() => {
        fetchAccountsList();
        fetchAllCounts()
    }, []);

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-12 xl:col-span-12">
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
                        loading={accountsLoader}
                        isEmpty={!Accounts_List.length}
                        className="divide-y divide-gray-100"
                    >
                        {Accounts_List.map((u) => (
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
    )
}
