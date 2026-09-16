export interface Student {
  id: number;
  name: string;
  group: string;
  className: string;
  color: string;
}

export const students: Student[] = [
  // GROUP 01 — ม.4/4
  { id: 1, name: "นาย ฐิติโชติ นวลสี", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 2, name: "นาย พงศพัศ วงศ์ศรีชา", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 3, name: "นาย ภูริวัฒน์ ภูธิรักษ์", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 4, name: "นาย ศิวัช อ่ำไพฤทธิ์", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 5, name: "นาย ปฏิภาณ สุวรรณรัตน์", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 6, name: "นาย ชลันทร ขุนศรี", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 7, name: "นาย อัศวิน นุชลำยอง", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 8, name: "นาย กฤษฎา บุญจำนงค์", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 9, name: "นาย พีรพล จันเคน", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  { id: 10, name: "นาย ธัชธรรม แก่งทองหลาง", group: "GROUP 01", className: "ม.4/4", color: "text-blue-400" },
  // GROUP 02 — ม.4/4
  { id: 11, name: "นางสาว อาทิตยา ทิพยะศรี", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 12, name: "นางสาว ญาดา ใจอารีย์", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 13, name: "นางสาว ณัฏฐนันท์ พูลศิริวิไล", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 14, name: "นางสาว ธัญญ์ธิชา แสงวงค์", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 15, name: "นางสาว นันท์นภัส วงศ์สุวรรณ", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 16, name: "นางสาว อนันฐาภรณ์ ประโท", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 17, name: "นางสาว ปาริตา จันทร์เทพ", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 18, name: "นางสาว อภิชญา จันทรขันตี", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 19, name: "นางสาว กัญญาณัฐ ศรีมุกดา", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 20, name: "นางสาว จิลาวัลย์ ผาอินดี", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 21, name: "นางสาว มณีรัตน์ จะแงมรัมย์", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 22, name: "นางสาว ชญานุตม์ มองโพธิ์", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 23, name: "นางสาว ฐิตารีย์ กองแก้วกาเหรียญ", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  { id: 24, name: "นางสาว สุพิชญา บุพศิริ", group: "GROUP 02", className: "ม.4/4", color: "text-purple-400" },
  // GROUP 03 — ม.5/4
  { id: 25, name: "นาย ธีรโชติ หอมจำปา", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 26, name: "นาย กิตติพงษ์ เดือยพิมพ์", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 27, name: "นาย ณภัทร ไชยบิล", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 28, name: "นาย เตชิต พันรักษา", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 29, name: "นาย นิติธร คำเถื่อน", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 30, name: "นาย ปภาวิชญ์ ไพวัน", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 31, name: "นาย สภณวิชญ์ เอกพันธ์", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 32, name: "นาย สุทธิพร โพธินัย", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 33, name: "นาย ธนากาญจน์ ศรีจันทร์", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 34, name: "นาย รชตะ สีดา", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 35, name: "นาย ธีระกร แสงโสม", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 36, name: "นาย พุทธิพงศ์ เกวิรัตน์", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 37, name: "นาย พัชรตนัย เนี่ยมเปี่ย", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  { id: 38, name: "นาย นที ยี่รัมย์", group: "GROUP 03", className: "ม.5/4", color: "text-emerald-400" },
  // GROUP 04 — ม.5/4
  { id: 39, name: "นางสาว เบญญภา ภูอาบอ่อน", group: "GROUP 04", className: "ม.5/4", color: "text-amber-400" },
  { id: 40, name: "นางสาว หทัยกาญจน์ ศักดิ์เจริญ ณ นครพนม", group: "GROUP 04", className: "ม.5/4", color: "text-amber-400" },
  { id: 41, name: "นางสาว เกสรา หาวงค์", group: "GROUP 04", className: "ม.5/4", color: "text-amber-400" },
  { id: 42, name: "นางสาว เมธาวี บุตะโคตร", group: "GROUP 04", className: "ม.5/4", color: "text-amber-400" },
  { id: 43, name: "นางสาว วันทนา ห้วยทราย", group: "GROUP 04", className: "ม.5/4", color: "text-amber-400" },
  { id: 44, name: "นางสาว สุภัทรตา สากลวารี", group: "GROUP 04", className: "ม.5/4", color: "text-amber-400" },
];
