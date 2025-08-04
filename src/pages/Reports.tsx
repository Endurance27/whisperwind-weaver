import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Download, Filter } from "lucide-react";

const reportData = [
  {
    topic: "Mental Health",
    hashtag: "#MentalHealthAwareness", 
    influencer: "Abena Korkor",
    mentions: 4256,
    sentiment: "Positive",
    likes: "",
    shares: "",
    date: ""
  },
  {
    topic: "PwDs", 
    hashtag: "#InclusiveEducation",
    influencer: "Kaly Jay",
    mentions: 3872,
    sentiment: "Positive", 
    likes: "",
    shares: "",
    date: ""
  },
  {
    topic: "Mental Health",
    hashtag: "#BreakTheStigma",
    influencer: "Kwame Dzifa", 
    mentions: 4123,
    sentiment: "Positive",
    likes: "",
    shares: "",
    date: ""
  },
  {
    topic: "LGBTQ",
    hashtag: "#HumanRightsForAll",
    influencer: "Sam George",
    mentions: 1765,
    sentiment: "Neutral",
    likes: "",
    shares: "",
    date: ""
  },
  {
    topic: "VAW",
    hashtag: "#EndGBVInGhana", 
    influencer: "Nana Ama McBrown",
    mentions: 4256,
    sentiment: "Negative",
    likes: "",
    shares: "",
    date: ""
  },
  {
    topic: "VAW",
    hashtag: "#SpeakUpGhana",
    influencer: "Lydia Forson",
    mentions: 3872,
    sentiment: "Negative", 
    likes: "",
    shares: "",
    date: ""
  }
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Report Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Report Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start date</Label>
                <div className="relative">
                  <Input id="start-date" placeholder="Select start date" />
                  <Calendar className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End date</Label>
                <div className="relative">
                  <Input id="end-date" placeholder="Select end date" />
                  <Calendar className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Topics</Label>
                <div className="space-y-2">
                  {["PwDs", "VAW", "Mental Health", "LGBTQ+"].map((topic) => (
                    <div key={topic} className="flex items-center space-x-2">
                      <Checkbox id={topic} defaultChecked />
                      <Label htmlFor={topic} className="text-sm">{topic}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-format">Export Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Data</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Table
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead>Hashtag</TableHead>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Mentions</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            row.topic === "Mental Health" ? "bg-category-mental/20 text-category-mental" :
                            row.topic === "VAW" ? "bg-category-vaw/20 text-category-vaw" :
                            row.topic === "PwDs" ? "bg-category-pwds/20 text-category-pwds" :
                            "bg-category-lgbtq/20 text-category-lgbtq"
                          }`}
                        >
                          {row.topic}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{row.hashtag}</TableCell>
                      <TableCell>{row.influencer}</TableCell>
                      <TableCell>{row.mentions.toLocaleString()}</TableCell>
                      <TableCell>{row.likes}</TableCell>
                      <TableCell>{row.shares}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={`${
                            row.sentiment === "Positive" ? "bg-sentiment-positive/20 text-sentiment-positive" :
                            row.sentiment === "Negative" ? "bg-sentiment-negative/20 text-sentiment-negative" :
                            "bg-sentiment-neutral/20 text-sentiment-neutral"
                          }`}
                        >
                          {row.sentiment}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;