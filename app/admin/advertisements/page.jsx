'use client'
import { useState, useEffect } from 'react';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Modal } from "@/components/ui/modal";
import React from "react";
import Button from '@/components/ui/button/Button';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import Badge from '@/components/ui/badge/Badge';
import axios from 'axios';
import Select from '@/components/form/Select';
import { PencilIcon, PlusIcon, TrashBinIcon } from '@/icons';

export default function Advertisements_List() {

    const [Advertisements_List, setAdvertisements_List] = useState([])

    const [Ad_Id, setAd_Id] = useState('')
    const [User_Id, setUser_Id] = useState('0fe2fda6-2779-4e83-a5ee-4d65a558a355')
    const [Title, setTitle] = useState('Summer Sale Campaign')
    const [Content, setContent] = useState('Get up to 50% off on all summer clothing. Limited time offer!')
    const [Attachment, setAttachment] = useState(null)
    const [Ad_Type, setAd_Type] = useState('banner')
    const [Ad_Link, setAd_Link] = useState('https://example.com/banner/summer-sale.jpg')
    const [Target_Audiance, setTarget_Audiance] = useState('all')
    const [Start_Date_Time, setStart_Date_Time] = useState(new Date())
    const [End_Date_Time, setEnd_Date_Time] = useState(new Date())
    const [Payment_Amount, setPayment_Amount] = useState(0)
    const [Payment_Type, setPayment_Type] = useState('free')
    const [Ad_Status, setAd_Status] = useState('active')

    const [User_Id_VLDT, setUser_Id_VLDT] = useState('')
    const [Title_VLDT, setTitle_VLDT] = useState('')

    const [Delete_Ad_Id, setDelete_Ad_Id] = useState('')

    const [newAdView, setNewAdView] = useState(false)
    const [deleteAdView, setDeleteAdView] = useState(false)
    const [adsLoader, setAdsLoader] = useState(true)
    const [saveLoader, setSaveLoader] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)

    const [User_Search, setUser_Search] = useState('')
    const [User_Search_List, setUser_Search_List] = useState([])
    const [User_Search_Loader, setUser_Search_Loader] = useState(false)
    const [Show_User_List, setShow_User_List] = useState(false)
    const [Search_Timeout, setSearch_Timeout] = useState(null)

    const Fetch_Advertisements_List = async () => {
        try {
            setAdsLoader(true)
            const { data } = await axios.get("http://192.168.10.3:8000/api/users/advertisements/all")
            setAdvertisements_List(data?.data || [])
        } catch (error) {

        } finally {
            setAdsLoader(false)
        }
    }

    const Search_Users = async (query) => {
        if (!query || query.length < 2) {
            setUser_Search_List([])
            return
        }

        try {
            setUser_Search_Loader(true)
            const { data } = await axios.get('http://192.168.10.3:8000/api/users/search/autocomplete', {
                params: {
                    q: query,
                    limit: 10,
                },
            })

            setUser_Search_List(data?.data || [])
        } catch (error) {
            setUser_Search_List([])
        } finally {
            setUser_Search_Loader(false)
        }
    }

    const Create_New_Advertisement = async () => {
        if (!User_Id) {
            setUser_Id_VLDT('Required..! Please Enter User Id')
            setTimeout(() => setUser_Id_VLDT(''), 4000)
        } else if (!Title) {
            setTitle_VLDT('Required..! Please Enter Title')
            setTimeout(() => setTitle_VLDT(''), 4000)
        } else {
            try {
                setSaveLoader(true)
                await axios.post(`http://192.168.10.3:8000/api/users/advertisement/create`, {
                    user_id: User_Id,
                    title: Title,
                    content: Content,
                    ad_type: Ad_Type,
                    ad_link: Ad_Link,
                    target_audiance: Target_Audiance,
                    start_date_time: Start_Date_Time,
                    end_date_time: End_Date_Time,
                    payment_amount: Payment_Amount,
                    payment_type: Payment_Type,
                    status: Ad_Status,
                })
                await Fetch_Advertisements_List()
                clearStates()
                setNewAdView(false)
            } catch (error) {

            } finally {
                setSaveLoader(false)
            }
        }
    }

    const Update_Advertisement_By_Id = async () => {
        if (!User_Id) {
            setUser_Id_VLDT('Required..! Please Enter User Id')
            setTimeout(() => setUser_Id_VLDT(''), 4000)
        } else if (!Title) {
            setTitle_VLDT('Required..! Please Enter Title')
            setTimeout(() => setTitle_VLDT(''), 4000)
        } else {
            try {
                setSaveLoader(true)
                await axios.put(`http://192.168.10.3:8000/api/users/advertisements/${Ad_Id}`, {
                    user_id: User_Id,
                    title: Title,
                    content: Content,
                    ad_type: Ad_Type,
                    ad_link: Ad_Link,
                    target_audiance: Target_Audiance,
                    start_date_time: Start_Date_Time,
                    end_date_time: End_Date_Time,
                    payment_amount: Payment_Amount,
                    payment_type: Payment_Type,
                    status: Ad_Status,
                })
                await Fetch_Advertisements_List()
                clearStates()
                setNewAdView(false)
            } catch (error) {

            } finally {
                setSaveLoader(false)
            }
        }
    }

    const Delete_Advertisement_By_Id = async () => {
        try {
            setDeleteLoader(true)
            await axios.delete(`http://192.168.10.3:8000/api/users/advertisements/${Delete_Ad_Id}`)
            await Fetch_Advertisements_List()
            setDeleteAdView(false)
        } catch (error) {

        } finally {
            setDeleteLoader(false)
        }
    }

    const onPressEdit = (ad) => {
        setAd_Id(ad.id)
        setUser_Id(ad.user_id)
        setUser_Search(`${ad.requestor.first_name} ${ad.requestor.last_name} (${ad.requestor.email})`)
        setTitle(ad.title)
        setContent(ad.content || '')
        setAd_Type(ad.ad_type || '')
        setAd_Link(ad.ad_link || '')
        setTarget_Audiance(ad.target_audience || '')
        setStart_Date_Time(ad.start_date_time || '')
        setEnd_Date_Time(ad.end_date_time || '')
        setPayment_Amount(ad.payment_amount || '')
        setPayment_Type(ad.payment_type)
        setAd_Status(ad.status)
        setNewAdView(true)
    }

    const onPressDelete = (ad) => {
        setDelete_Ad_Id(ad.id)
        setDeleteAdView(true)
    }

    const clearStates = () => {
        setAd_Id('')
        setUser_Id('')
        setUser_Search('')
        setTitle('')
        setContent('')
        setAttachment(null)
        setAd_Type('')
        setAd_Link('')
        setTarget_Audiance('')
        setStart_Date_Time('')
        setEnd_Date_Time('')
        setPayment_Amount('')
        setPayment_Type('free')
        setAd_Status('active')
        setShow_User_List(false)
    }

    const onUserSearchChange = (e) => {
        const value = e.target.value
        setUser_Search(value)
        setUser_Id('')
        setShow_User_List(true)

        if (Search_Timeout) {
            clearTimeout(Search_Timeout)
        }

        const timeout = setTimeout(() => {
            Search_Users(value)
        }, 500)

        setSearch_Timeout(timeout)
    }


    const onSelectUser = (user) => {
        setUser_Id(user.id)
        setUser_Search(`${user.first_name} ${user.last_name} (${user.email})`)
        setShow_User_List(false)
        setUser_Search_List([])
    }

    useEffect(() => {
        Fetch_Advertisements_List()
    }, [])

    return (
        <div>
            <PageBreadcrumb pageTitle="Advertisements" />

            <div className="space-y-3">
                <div className="flex flex-row justify-end">
                    <Button size="sm" onClick={() => setNewAdView(true)} startIcon={<PlusIcon />}>
                        Add Advertisement
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell isHeader>Title</TableCell>
                            <TableCell isHeader>User</TableCell>
                            <TableCell isHeader>Payment</TableCell>
                            <TableCell isHeader>Status</TableCell>
                            <TableCell isHeader>ACT</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody loading={adsLoader} isEmpty={!Advertisements_List.length}>
                        {Advertisements_List.map((ad) => (
                            <TableRow key={ad.id}>
                                <TableCell>{ad.title}</TableCell>
                                <TableCell>{`${ad.requestor.first_name} ${ad.requestor.last_name} (${ad.requestor.email})`}</TableCell>
                                <TableCell>{ad.payment_type}</TableCell>
                                <TableCell>
                                    <Badge color={ad.status === "active" ? "success" : "warning"}>
                                        {ad.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="w-4">
                                    <div className="flex flex-row items-center gap-5">
                                        <span onClick={() => onPressEdit(ad)} className="cursor-pointer text-brand-500">
                                            <PencilIcon />
                                        </span>
                                        <span onClick={() => onPressDelete(ad)} className="cursor-pointer text-red-500">
                                            <TrashBinIcon />
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Modal
                isOpen={newAdView}
                onClose={() => setNewAdView(false)}
                className="max-w-[600px] p-5 lg:p-10"
            >
                <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                    {Ad_Id ? 'Update Advertisement' : 'Create New Advertisement'}
                </h4>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <div className="col-span-1 sm:col-span-2">
                        <div className="relative">
                            <Label>User</Label>
                            <Input
                                defaultValue={User_Search}
                                onChange={onUserSearchChange}
                                error={User_Id_VLDT}
                                hint={User_Id_VLDT}
                                placeholder="Search user by name, username or email"
                                onFocus={() => setShow_User_List(true)}
                            />

                            {Show_User_List && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto">
                                    {User_Search_Loader && (
                                        <div className="p-3 text-sm text-gray-500">Searching...</div>
                                    )}

                                    {!User_Search_Loader && !User_Search_List.length && (
                                        <div className="p-3 text-sm text-gray-500">No users found</div>
                                    )}

                                    {!User_Search_Loader &&
                                        User_Search_List.map((user) => (
                                            <div
                                                key={user.user_id}
                                                onClick={() => onSelectUser(user)}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                            >
                                                <div className="text-sm font-medium">
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    @{user.username} · {user.email}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <Label>Title</Label>
                        <Input
                            defaultValue={Title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={Title_VLDT}
                            hint={Title_VLDT}
                            placeholder="Enter Advertisement Title"
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <Label>Content</Label>
                        <Input
                            defaultValue={Content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter advertisement content"
                        />
                    </div>

                    <div className="col-span-1">
                        <Label>Ad Type</Label>
                        <Select
                            defaultValue={Ad_Type}
                            onChange={(e) => setAd_Type(e)}
                            options={adTypes}
                        />
                    </div>

                    <div className="col-span-1">
                        <Label>Target Audience</Label>
                        <Select
                            defaultValue={Target_Audiance}
                            onChange={(e) => setTarget_Audiance(e)}
                            options={targetAudiance}
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <Label>Ad Link</Label>
                        <Input
                            defaultValue={Ad_Link}
                            onChange={(e) => setAd_Link(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="col-span-1">
                        <Label>Start Date & Time</Label>
                        <Input
                            type="datetime-local"
                            defaultValue={Start_Date_Time}
                            onChange={(e) => setStart_Date_Time(e.target.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <Label>End Date & Time</Label>
                        <Input
                            type="datetime-local"
                            defaultValue={End_Date_Time}
                            onChange={(e) => setEnd_Date_Time(e.target.value)}
                        />
                    </div>
                    <div className="col-span-1">
                        <Label>Payment Type</Label>
                        <Select
                            defaultValue={Payment_Type}
                            onChange={(e) => setPayment_Type(e)}
                            options={paymentTypes}
                        />
                    </div>

                    <div className="col-span-1">
                        <Label>Status</Label>
                        <Select
                            defaultValue={Ad_Status}
                            onChange={(e) => setAd_Status(e)}
                            options={adStatuses}
                        />
                    </div>
                    {Payment_Type === 'paid' && (
                        <div className="col-span-2">
                            <Label>Payment Amount</Label>
                            <Input
                                type="number"
                                defaultValue={Payment_Amount}
                                onChange={(e) => setPayment_Amount(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end w-full gap-3 mt-6">
                    <Button size="sm" variant="outline" onClick={() => setNewAdView(false)}>
                        Discard
                    </Button>
                    {Ad_Id ? (
                        <Button size="sm" onClick={() => Update_Advertisement_By_Id()} loading={saveLoader}>
                            Save
                        </Button>
                    ) : (
                        <Button size="sm" onClick={() => Create_New_Advertisement()} loading={saveLoader}>
                            Save
                        </Button>
                    )}
                </div>
            </Modal>

            <Modal
                isOpen={deleteAdView}
                onClose={() => setDeleteAdView(false)}
                className="max-w-[400px] p-4"
                showCloseButton={false}
            >
                <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">
                        Delete Advertisement
                    </h4>
                    <span>Are you sure..! You want to delete this advertisement.</span>
                    <div className="flex flex-row justify-end gap-3 mt-2">
                        <Button
                            size="sm"
                            onClick={() => {
                                setDelete_Ad_Id('')
                                setDeleteAdView(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => Delete_Advertisement_By_Id()}
                            loading={deleteLoader}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const adStatuses = [
    { label: 'ACTIVE', value: 'active' },
    { label: 'INACTIVE', value: 'inactive' },
]

const paymentTypes = [
    { label: 'FREE', value: 'free' },
    { label: 'PAID', value: 'paid' },
]

const adTypes = [
    { label: 'BANNER', value: 'banner' },
    { label: 'VIDEO', value: 'video' },
    { label: 'POPUP', value: 'popup' },
]

const targetAudiance = [
    { label: 'ALL USERS', value: 'all' },
    { label: 'FOLLOWERS', value: 'followers' },
    { label: 'PREMIUM', value: 'premium' },
]
