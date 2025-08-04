import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TweetsByTopicChart, TopHashtagsChart, SentimentAnalysisChart, WeeklyTrendsChart } from "@/components/dashboard/Charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const topHashtags = [
    "#DisabilityInGhana",
    "#InclusionMattersGH", 
    "#EmpowerPwDs",
    "#DisabilityRightsGH",
    "#EndVAWGH",
    "#StopAbuseGH",
    "#ProtectWomenGH",
    "#MentalHealthGH",
    "#EndTheStigmaGH",
    "#ReadTheBillGH",
    "#JusticeForWomenGH",
    "#HerVoiceMatters",
    "#LoveIsLoveGH",
    "#HumanRightsGH",
    "#InclusiveGhana",
    "#VoicesOfChangeGH"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Total Tweets"
            value="538"
            subtitle="+2% from last week"
            bgColor="bg-analytics-blue"
          />
          <MetricCard
            title="Hashtag Usage"
            value="135"
            subtitle="+8% from last week"
            bgColor="bg-analytics-green"
          />
          <MetricCard
            title="Political Engagement Metrics"
            value="226"
            subtitle="+5% from last week"
            bgColor="bg-analytics-purple"
          />
          <MetricCard
            title="Influencer Identification"
            value="34"
            subtitle="+3% from last week"
            bgColor="bg-analytics-pink"
          />
          <MetricCard
            title="Reports"
            value="26"
            subtitle="+15% from last week"
            bgColor="bg-analytics-teal"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TweetsByTopicChart />
          <TopHashtagsChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SentimentAnalysisChart />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Hashtags</CardTitle>
              <p className="text-sm text-muted-foreground">Most frequently used hashtags</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {topHashtags.map((hashtag, index) => (
                  <div key={hashtag} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{hashtag}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Trends */}
        <WeeklyTrendsChart />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;