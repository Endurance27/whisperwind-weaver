import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const supportedTopics = [
  {
    name: "Persons with Disabilities",
    code: "PwDs",
    description: "Content related to disability rights, accessibility, and inclusion",
    color: "bg-category-pwds"
  },
  {
    name: "Violence Against Women", 
    code: "VAW",
    description: "Content about gender-based violence and women's safety",
    color: "bg-category-vaw"
  },
  {
    name: "Mental Health & Wellness",
    code: "Mental Health", 
    description: "Content about mental health awareness and support",
    color: "bg-category-mental"
  },
  {
    name: "LGBTQ+ Communities",
    code: "LGBTQ",
    description: "Content about LGBTQ+ rights and inclusion",
    color: "bg-category-lgbtq"
  }
];

const TweetClassifier = () => {
  const [content, setContent] = useState("");
  const [classificationResult, setClassificationResult] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const { toast } = useToast();

  const handleClassify = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to classify",
        variant: "destructive"
      });
      return;
    }

    setIsClassifying(true);
    
    // Simulate AI classification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock classification result based on keywords
    let result = "";
    if (content.toLowerCase().includes("mental") || content.toLowerCase().includes("depression") || content.toLowerCase().includes("anxiety")) {
      result = "Mental Health";
    } else if (content.toLowerCase().includes("disability") || content.toLowerCase().includes("accessible") || content.toLowerCase().includes("inclusion")) {
      result = "PwDs";
    } else if (content.toLowerCase().includes("violence") || content.toLowerCase().includes("women") || content.toLowerCase().includes("abuse")) {
      result = "VAW";
    } else if (content.toLowerCase().includes("lgbtq") || content.toLowerCase().includes("gay") || content.toLowerCase().includes("lesbian")) {
      result = "LGBTQ";
    } else {
      result = "Mental Health"; // Default classification
    }
    
    setClassificationResult(result);
    setIsClassifying(false);
    
    toast({
      title: "Classification Complete",
      description: `Content classified as: ${result}`
    });
  };

  const getTopicColor = (topic: string) => {
    const topicInfo = supportedTopics.find(t => t.code === topic);
    return topicInfo?.color || "bg-muted";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tweet Classifier</h1>
          <p className="text-muted-foreground">
            Classify content into topics: PwDs, VAW, Mental Health, and LGBTQ+
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classification Input */}
          <Card>
            <CardHeader>
              <CardTitle>Content Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter content to classify (tweets, posts, etc.)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>

              <Button 
                onClick={handleClassify}
                disabled={isClassifying}
                className="w-full"
                size="lg"
              >
                {isClassifying ? "Classifying..." : "Classify"}
              </Button>

              {classificationResult && (
                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Classification Result:</h3>
                  <Badge 
                    className={`${getTopicColor(classificationResult)} text-white text-sm px-3 py-1`}
                  >
                    {classificationResult}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    {supportedTopics.find(t => t.code === classificationResult)?.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Supported Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Supported Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {supportedTopics.map((topic) => (
                  <Card key={topic.code} className={`border-0 ${topic.color} text-white`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {topic.code}
                        </Badge>
                        <h3 className="font-semibold">{topic.name}</h3>
                      </div>
                      <p className="text-sm opacity-90">{topic.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Classifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Classifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  content: "Mental health awareness is crucial for breaking stigma in our communities...",
                  classification: "Mental Health",
                  timestamp: "2 minutes ago"
                },
                {
                  content: "We need better accessibility infrastructure for persons with disabilities...", 
                  classification: "PwDs",
                  timestamp: "5 minutes ago"
                },
                {
                  content: "Violence against women must end. Every woman deserves to feel safe...",
                  classification: "VAW", 
                  timestamp: "8 minutes ago"
                },
                {
                  content: "Love is love. Everyone deserves equal rights regardless of sexual orientation...",
                  classification: "LGBTQ",
                  timestamp: "12 minutes ago"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm mb-2">{item.content}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`${getTopicColor(item.classification)} text-white text-xs`}
                      >
                        {item.classification}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TweetClassifier;